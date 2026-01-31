<template>
  <div v-if="loading" class="loading-container">
    <div class="loading-spinner">Loading product details...</div>
  </div>
  <div v-else-if="error" class="error-container">
    <div class="error-message">{{ error }}</div>
    <button @click="retryFetch" class="retry-button">Retry</button>
  </div>
  <div v-else-if="!product" class="not-found-container">
    <div class="not-found-message">Product not found</div>
    <button @click="router.push('/products')" class="back-button">
      Back to Products
    </button>
  </div>
  <div v-else class="product-detail-page">
    <!-- Left Side: Image Area  -->

    <div class="product-image-area">
      <div class="main-image-placeholder">
        <img
          v-if="mainImage"
          :src="mainImage"
          alt="Product Image"
          class="main-product-image"
        />
        <div v-else class="image-icon">🖼️</div>
      </div>
      <div class="thumbnail-placeholders">
        <div
          v-for="(image, index) in product.images || []"
          :key="index"
          class="thumbnail"
          @click="setMainImage(image.image || image)"
        >
          <img
            :src="image.image || image"
            alt="Thumbnail"
            class="thumbnail-image"
          />
        </div>
      </div>
    </div>

    <div class="product-detail">
      <div class="product-content-area">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="status-bar">
          <span class="stock-status" v-if="product.is_in_stock"
            >✓ In Stock</span
          >
          <span class="stock-status" v-else>✗ Out of Stock</span>
        </div>

        <div class="price-section">
          <div class="price-badge">
            <span class="current-price">
              NPR {{ product.final_price.toLocaleString() }}
            </span>
            <span v-if="Number(product.discount_price) > 0" class="old-price">
              NPR {{ product.price.toLocaleString() }}
            </span>
            <span v-if="product.discount_percentage" class="discount-percent">
              {{ product.discount_percentage }}% OFF
            </span>
          </div>
        </div>

        <p class="product-description">{{ product.short_description }}</p>
        <div class="quantity-section-container">
          <div class="quantity-label">Quantity:</div>
          <div class="quantity-control-wrapper">
            <button
              type="button"
              class="quantity-button decrement"
              @click="updateQuantity(-1)"
            >
              -
            </button>
            <input
              type="text"
              class="quantity-input"
              v-model="quantity"
              readonly
            />
            <button
              type="button"
              class="quantity-button increment"
              @click="updateQuantity(1)"
            >
              +
            </button>
          </div>
        </div>

        <div class="button-container">
          <button
            type="button"
            class="add-to-cart-button"
            :class="{ 'out-of-stock': !product.is_in_stock }"
            :disabled="!product.is_in_stock"
            @click="handleAddToCart(product, quantity)"
          >
            🛒 {{ buttonText }}
          </button>

          <button
            type="button"
            class="wishlist-button"
            @click="addToWishlist(product)"
          >
            ❤️ Add to Wishlist
          </button>
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="icon"></div>
            <div class="feature-text">
              <div class="feature-title">Free Delivery</div>
              <div class="feature-desc">On orders above NPR 5,000</div>
            </div>
          </div>

          <div class="feature-item">
            <div class="icon"></div>
            <div class="feature-text">
              <div class="feature-title">Professional Installation</div>
              <div class="feature-desc">Expert setup and training included</div>
            </div>
          </div>

          <div class="feature-item">
            <div class="icon"></div>
            <div class="feature-text">
              <div class="feature-title">2-Year Warranty</div>
              <div class="feature-desc">24/7 technical support included</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="product">
    <h2>Related Products</h2>

    <div class="products">
      <div
        v-for="related in relatedProducts"
        :key="related.id"
        class="card"
        @click="$router.push(`/productdetail/${related.id}`)"
      >
        <div
          class="card-img"
          :style="{
            backgroundImage: `url(${
              related.images && related.images.length
                ? related.images[0]
                : '/assets/medical.jpeg'
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        ></div>
        <div class="card-body">
          <div class="card-title">{{ related.name }}</div>
          <div class="card-price">NPR {{ related.price.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, inject, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axios";

export default {
  name: "ProductDetail",

  props: {
    productId: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    // Inject global states
    const cartState = inject("cartState");
    const wishlistState = inject("wishlistState");

    if (!cartState) console.error("cartState not provided");
    if (!wishlistState) console.error("wishlistState not provided");

    // Reactive refs
    const product = ref(null);
    const mainImage = ref("");
    const quantity = ref(1);
    const loading = ref(true);
    const error = ref(null);
    const relatedProducts = ref([]);

    // Fetch product by ID
    const fetchProductById = async (productId) => {
      try {
        loading.value = true;
        error.value = null;

        let nextPageUrl = "/api/products/";
        let foundProduct = null;

        // Loop through pages to find product
        while (nextPageUrl && !foundProduct) {
          const res = await api.get(nextPageUrl);
          const products = res.data.results || [];
          foundProduct = products.find((p) => p.id == productId);
          if (foundProduct) break;
          nextPageUrl = res.data.next;
        }

        if (!foundProduct)
          throw new Error(`Product with ID ${productId} not found.`);

        product.value = foundProduct;
        mainImage.value = product.value.primary_image || "/assets/medical.jpeg";

        // Fetch related products by category
        if (product.value.category?.id) {
          const relatedRes = await api.get(
            `/api/products/?category=${product.value.category.id}`,
          );
          relatedProducts.value = relatedRes.data.results
            .filter((p) => p.id !== product.value.id)
            .slice(0, 4);
        } else {
          relatedProducts.value = [];
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        error.value = err.message || "Failed to load product.";
      } finally {
        loading.value = false;
      }
    };

    // Quantity controls
    const updateQuantity = (change) => {
      const newQty = quantity.value + change;
      quantity.value = newQty < 1 ? 1 : newQty;
    };

    const setMainImage = (image) => {
      mainImage.value = image || "/assets/medical.jpeg";
    };

    // Add to cart
    const handleAddToCart = async (prod, qty = 1) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // Sync with backend
        await api.post(
          "/api/cart/add_item/",
          { product_id: prod.id, quantity: qty },
          { headers: { Authorization: `Token ${token}` } },
        );

        // Update local cart state
        cartState.addToCart({
          id: prod.id,
          name: prod.name,
          price: prod.final_price || prod.price,
          image: prod.primary_image || "/assets/medical.jpeg",
          quantity: qty,
        });

        cartState.showToast("Product added to cart!", "success");
      } catch (err) {
        console.error("Failed to add to cart:", err.response || err);
        const msg = err.response?.data?.detail || "Failed to add to cart.";
        cartState.showToast(msg, "error");
      }
    };

    // Add to wishlist
    const addToWishlist = async (prod) => {
      if (!wishlistState) {
        cartState?.showToast("Wishlist functionality not available", "error");
        return;
      }

      // Add locally first
      wishlistState.addToWishlist({
        id: prod.id,
        name: prod.name,
        price: prod.final_price || prod.price,
        image: prod.primary_image || "/assets/medical.jpeg",
      });

      const token = localStorage.getItem("authToken");

      if (!token) {
        cartState?.showToast(
          "Product added to wishlist locally! Login to sync.",
          "info",
        );
        return;
      }

      // If logged in, try to sync with backend
      try {
        await api.post(
          "/api/wishlist/",
          { product_id: prod.id },
          {
            headers: { Authorization: `Token ${token}` },
          },
        );
        cartState?.showToast("Product added to wishlist!", "success");
      } catch (err) {
        console.error("Failed to sync wishlist:", err);
        cartState?.showToast(
          "Product added locally, but failed to sync with server.",
          "warning",
        );
      }
    };

    // Retry fetch if error
    const retryFetch = () => {
      error.value = null;
      fetchProductById(props.productId);
    };

    // Computed button text
    const buttonText = computed(() => {
      return product.value?.is_in_stock ? "Add to Cart" : "Out of Stock";
    });

    // Watch route changes
    watch(
      () => route.params.productId,
      async (newId) => {
        if (newId && newId != props.productId) {
          quantity.value = 1;
          await fetchProductById(newId);
        }
      },
    );

    onMounted(async () => {
      await fetchProductById(props.productId);
    });

    return {
      product,
      mainImage,
      quantity,
      loading,
      error,
      relatedProducts,
      updateQuantity,
      setMainImage,
      handleAddToCart,
      addToWishlist,
      retryFetch,
      buttonText,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
}

.product-detail-page {
  display: flex;
  max-width: 1700px;
  margin: 0 auto;
  background-color: white;
  padding: 100px 150px 0px 150px;
  gap: 60px;
  flex-direction: row;
}

.product-image-area {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.main-image-placeholder {
  background-color: #f0f0f0;
  /* aspect-ratio: 16/9; */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.main-product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.thumbnail-placeholders {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.thumbnail {
  height: 90px;
  width: 180px;
  background-color: #f0f0f0;
  border-radius: 9px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thumbnail:hover {
  border-color: rgb(73, 178, 73);
  cursor: pointer;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px;
}
.product-detail {
  flex: 1;
  text-align: left;
}

.product-title {
  font-size: 28px;
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.status-bar {
  margin-bottom: 20px;
  font-size: 18px;
  color: #666;
}

.stock-status {
  color: #6fc6f5;
  font-weight: bold;
  margin-left: 15px;
}

.price-section {
  background-color: #eef7ee;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.price-badge {
  display: flex;
  align-items: center;
}

.current-price {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.old-price {
  font-size: 18px;
  color: #999;
  text-decoration: line-through;
  margin-right: 10px;
}

.discount-percent {
  background-color: #388e3c;
  color: white;
  padding: 5px 10px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: bold;
}

.product-description {
  color: #555;
  line-height: 1.4;
  margin-bottom: 20px;
  text-align: left;
}

.features-box {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-direction: column;
}

.features-text {
  font-size: 18px;
  color: #2c3e50;
  margin: 0 10px 0 0;
  text-align: left;
}

.features-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: #555;
  flex: 1;
}

.features-list li {
  margin-bottom: 5px;
}

.quantity-section-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.quantity-label {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.quantity-control-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-button {
  background-color: #f9f9f9;
  border: none;
  padding: 8px 12px;
  font-size: 18px;
  cursor: pointer;
  color: #555;
  transition: background-color 0.2s;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}

.quantity-button:hover {
  background-color: #e9e9e9;
}

.quantity-button.decrement {
  border-left: none;
}
.quantity-button.increment {
  border-right: none;
}

.quantity-input {
  width: 40px;
  padding: 8px 0;
  text-align: center;
  border: none;
  font-size: 16px;
  color: #333;
  outline: none;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-to-cart-button {
  flex: 1;
  text-align: center;
  background-color: #6fc6f5;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover:not(.out-of-stock) {
  background-color: #5bb8f5;
}

.add-to-cart-button.out-of-stock {
  background-color: #ccc;
  cursor: not-allowed;
}

.wishlist-button {
  flex: 1;
  text-align: center;
  background-color: #6fc6f5;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s;
}

.wishlist-button:hover:not(.out-of-stock) {
  background-color: #5bb8f5;
}

.wishlist-button.out-of-stock {
  background-color: #ccc;
  cursor: not-allowed;
}

h2 {
  padding-left: 150px;
  margin: 50px 20px;
  font-size: 28px;
  font-weight: 700;
}

.spec-card {
  background-color: #f0f0f0;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 22px 32px;
}

.spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  background-color: #f0f0f0;
}

.spec-item {
  padding: 20px 0;
  border-bottom: 1px solid #b4b3b3;
  background-color: #f0f0f0;
}

.spec-label {
  background-color: #f0f0f0;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}

.spec-value {
  background-color: #f0f0f0;
  font-size: 18px;
  font-weight: 700;
  color: #000;
}

.spec-grid .spec-item:nth-last-child(1),
.spec-grid .spec-item:nth-last-child(2) {
  border-bottom: none;
}
h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 80px 0 28px 0;
}

.products {
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.card {
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.card-img {
  height: 180px;
  background: #f0f0f0;
}

.card-body {
  padding: 15px 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 3px 0;
}

.card-price {
  font-size: 20px;
  font-weight: 700;
  color: #1a9e28;
}
.feature-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 22px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  background: #fff;
}

.icon {
  width: 20px;
  height: 20px;
  border: 2px solid #1a9e28;
  border-radius: 6px;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: 15px;
  font-weight: 500;
  color: #000;
  margin-bottom: 2px;
}

.feature-desc {
  font-size: 13px;
  color: #555;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .product-detail-page {
    flex-direction: row;
    padding: 20px;
    gap: 20px;
  }

  .product-image-area {
    flex: 0 0 35%;
  }

  .main-image-placeholder {
    height: 200px;
  }

  .product-title {
    font-size: 20px;
  }

  .current-price {
    font-size: 24px;
  }

  .product-description {
    font-size: 14px;
  }

  .features-text {
    font-size: 16px;
  }

  .price-section {
    padding: 10px;
  }

  .status-bar {
    font-size: 14px;
  }

  .thumbnail {
    height: 70px;
    width: 140px;
  }

  .card-img {
    height: 140px;
  }

  .products {
    grid-template-columns: repeat(2, 1fr);
  }

  h2 {
    padding-left: 20px;
    margin: 40px 20px 20px 20px;
    font-size: 24px;
  }

  .spec-card {
    padding: 15px 20px;
  }

  .spec-grid {
    column-gap: 30px;
  }
}
@media (max-width: 480px) {
  .add-to-cart-button,
  .wishlist-button {
    padding: 10px 20px;
    font-size: 14px;
    gap: 5px;
  }

  .add-to-cart-button span,
  .wishlist-button span {
    white-space: nowrap;
  }

  .button-container {
    flex-direction: row;
    gap: 10px;
  }
  .wishlist-button {
    height: 35px;
    font-size: 12px;
    font-weight: bold;
  }
  .add-to-cart-button {
    height: 35px;
    font-size: 12px;
    font-weight: bold;
  }
  .price-section {
    height: 50px;
    padding: 8px 8px;
  }
  .price-badge {
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  .current-price {
    font-size: 15px;
  }
  .old-price {
    font-size: 12px;
  }
  .discount-percent {
    font-size: 12px;
    height: 25px;
    text-align: center;
  }
  .quantity-control-wrapper {
    height: 40px;
  }
  .feature-item {
    height: 54px;
  }
  .feature-title {
    font-size: 12px;
    margin-bottom: 0;
  }
}
</style>
