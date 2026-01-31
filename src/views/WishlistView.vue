<template>
  <div class="wishlist-page">
    <!-- Empty Wishlist -->
    <div v-if="wishlistItems.length === 0" class="empty-wishlist">
      <h2>Your wishlist is empty</h2>
      <p>No items selected for the wishlist</p>
      <button class="continue-shopping-btn" @click="continueShopping">
        Add to wishlist
      </button>
    </div>

    <!-- Wishlist with Items -->
    <div v-else class="wishlist-content">
      <!-- LEFT -->
      <div class="wishlist-left">
        <div class="shop-block" v-for="item in wishlistItems" :key="item.id">
          <div class="shop-title">
            <span>Product</span>
            <button class="remove-item-btn" @click="removeFromWishlist(item)">
              🗑
            </button>
          </div>

          <div class="item-row">
            <img
              :src="item.image"
              class="product-img"
              @click="goToProductDetail(item)"
            />

            <div class="item-info" @click="goToProductDetail(item)">
              <h4>{{ item.name }}</h4>
              <p class="meta">Professional physiotherapy equipment</p>
            </div>

            <div class="item-price">
              <span class="price">Rs. {{ item.price }}</span>
            </div>

            <button class="add-to-cart-btn" @click="addToCart(item)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/axios";

export default {
  name: "WishlistView",
  setup() {
    const wishlistState = inject("wishlistState");
    const cartState = inject("cartState");
    const router = useRouter();
    const loading = ref(false);
    const error = ref(null);

    const fetchWishlist = async () => {
      try {
        loading.value = true;
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await api.post("/api/wishlist/", {
          headers: { Authorization: `Token ${token}` },
        });

        wishlistState.items = res.data.results || [];
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        error.value = "Failed to load wishlist.";
      } finally {
        loading.value = false;
      }
    };

    const removeFromWishlist = async (item) => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in first!");
          return;
        }

        await api.post(
          "/api/wishlist/",
          { product_id: item.id },
          { headers: { Authorization: `Token ${token}` } },
        );

        const index = wishlistState.items.findIndex(
          (wishlistItem) => wishlistItem.id === item.id,
        );
        if (index > -1) wishlistState.items.splice(index, 1);

        alert("Removed from wishlist!");
      } catch (err) {
        console.error("Failed to remove from wishlist:", err);
        alert("Failed to remove item from wishlist.");
      }
    };

    const addToCart = async (item) => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Please log in first!");
          return;
        }

        await cartState.addToCart(item);

        await removeFromWishlist(item);
      } catch (err) {
        console.error("Failed to add to cart:", err);
        alert("Failed to add item to cart.");
      }
    };

    const goToProductDetail = (item) => {
      router.push(`/productdetail/${item.id}`);
    };

    const continueShopping = () => {
      router.push("/products");
    };

    onMounted(() => {
      fetchWishlist();
    });

    return {
      wishlistItems: wishlistState.items,
      loading,
      error,
      removeFromWishlist,
      addToCart,
      goToProductDetail,
      continueShopping,
    };
  },
};
</script>

<style scoped>
.wishlist-page {
  max-width: 1200px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}

.wishlist-content {
  display: flex;
  gap: 20px;
}

.wishlist-left {
  flex: 1;
}

.shop-block {
  background: #fff;
  border: 1px solid #eee;
  margin-bottom: 15px;
}

.shop-title {
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-item-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: red;
  padding: 5px;
}

.remove-item-btn:hover {
  color: #6fc6f5;
}

.item-row {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 15px;
}

.product-img {
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.item-info {
  flex: 1;
  cursor: pointer;
}

.item-info h4 {
  margin-bottom: 5px;
}

.meta {
  font-size: 12px;
  color: #777;
}

.item-price {
  width: 120px;
}

.price {
  color: #6fc6f5;
  font-weight: bold;
}

.add-to-cart-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #6fc6f5 0%, #7ed9b0 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #5bb8f5 0%, #7ad9b0 100%);
}

.empty-wishlist {
  text-align: center;
  padding: 100px 20px;
  background: #fff;
  border-radius: 8px;
  max-width: 600px;
  margin: 50px auto;
  min-height: 400px;
}

.empty-wishlist h2 {
  color: #333;
  margin-bottom: 10px;
}

.empty-wishlist p {
  color: #777;
  margin-bottom: 30px;
}

.continue-shopping-btn {
  background: #6fc6f5;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.continue-shopping-btn:hover {
  background: #5bb8f5;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .wishlist-content {
    flex-direction: column;
  }

  .item-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item-price {
    width: auto;
  }

  .add-to-cart-btn {
    width: 100%;
    padding: 10px;
  }
}
</style>
