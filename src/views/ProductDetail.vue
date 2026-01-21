<template>
  <div v-if="product" class="product-detail-page">
    <!-- Left Side: Image Area  -->
    <div class="product-image-area">
      <div class="main-image-placeholder">
        <img v-if="mainImage" :src="mainImage" :alt="product.name" />
        <div v-else class="image-icon">🖼️</div>
      </div>

      <div class="thumbnail-placeholders">
        <div
          v-for="(img, index) in product.images"
          :key="index"
          class="thumbnail"
          @click="mainImage = img"
        >
          <img :src="img" :alt="product.name + ' thumbnail'" />
        </div>
      </div>
    </div>

    <!-- Right Side: Product Details -->
    <div class="product-detail">
      <div class="product-content-area">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="status-bar">
          <span class="rating"
            >★ {{ product.rating }} ({{ product.reviews }} reviews)</span
          >
          <span class="stock-status" v-if="product.inStock">✓ In Stock</span>
          <span class="stock-status" v-else>✗ Out of Stock</span>
        </div>

        <div class="price-section">
          <div class="price-badge">
            <span class="current-price"
              >NPR {{ product.price.toLocaleString() }}</span
            >
            <span v-if="product.oldPrice" class="old-price"
              >NPR {{ product.oldPrice.toLocaleString() }}</span
            >
            <span v-if="product.discount" class="discount-percent"
              >{{ product.discount }}% OFF</span
            >
          </div>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <div class="features-box">
          <h2 class="features-text">Key Features</h2>
          <ul class="features-list">
            <li v-for="(feature, index) in product.features" :key="index">
              ✓ {{ feature }}
            </li>
          </ul>
        </div>

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

        <button
          type="button"
          class="add-to-cart-button"
          @click="addToCart(product, quantity)"
        >
          🛒 Add to Cart
        </button>
      </div>

      <!-- Feature list -->
      <div class="feature-list">
        <div
          v-for="(f, i) in product.additionalFeatures"
          :key="i"
          class="feature-item"
        >
          <div class="icon"></div>
          <div class="feature-text">
            <div class="feature-title">{{ f.title }}</div>
            <div class="feature-desc">{{ f.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Specifications -->
    <h2>Specifications</h2>
    <div class="spec-card">
      <div class="spec-grid">
        <div
          v-for="(value, key) in product.specifications"
          :key="key"
          class="spec-item"
        >
          <div class="spec-label">{{ key }}</div>
          <div class="spec-value">{{ value }}</div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <h2>Related Products</h2>
    <div class="products">
      <div
        v-for="related in product.relatedProducts"
        :key="related.id"
        class="card"
      >
        <div class="card-img">
          <img
            v-if="related.images && related.images[0]"
            :src="related.images[0]"
            :alt="related.name"
          />
        </div>
        <div class="card-body">
          <div class="card-title">{{ related.name }}</div>
          <div class="card-price">NPR {{ related.price.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Product not found</p>
  </div>
</template>

<script>
import products from "@/data/products";

export default {
  name: "ProductDetail",

  data() {
    return {
      product: null,
      quantity: 1,
      mainImage: "",
    };
  },

  created() {
    const productId = Number(this.$route.params.productId);
    this.product = products.find((p) => p.id === productId);

    if (this.product && this.product.images?.length) {
      this.mainImage = this.product.images[0];
    }
  },

  methods: {
    updateQuantity(change) {
      this.quantity = Math.max(1, this.quantity + change);
    },

    addToCart() {
      alert(`Added ${this.quantity} of ${this.product.name} to cart`);
    },
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
  gap: 30px;
  flex-direction: row;
}

.product-image-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
}

.main-image-placeholder {
  background-color: #f0f0f0;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
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
}
.thumbnail:hover {
  border-color: rgb(73, 178, 73);
  cursor: pointer;
}
.product-detail {
  max-width: 50%;
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
  color: #388e3c;
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
  /* line-height: 1.4; */
  margin-bottom: 20px;
}

.features-text {

  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 10px;

}

.features-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 30px;
  color: #555;
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

.add-to-cart-button {
    width:100%;
   text-align:center;
  background-color: #388e3c;
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

.add-to-cart-button:hover {
  background-color: #2e7d32;
}

h2 {
  padding-left: 150px;
  margin: 50px  20px ;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.card {
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.card-img {
  height: 220px;
  background: #f0f0f0;
}

.card-body {
  padding: 20px 24px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 3px 0;
}

.card-price {
  font-size: 22px;
  font-weight: 700;
  color: #1a9e28;
}
.feature-list {
    margin-top:40px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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


</style>
