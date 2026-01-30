<template>
  <div v-if="isOpen" class="cart-overlay" @click="closeCart">
    <div class="cart-modal" @click.stop>
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button class="close-btn" @click="closeCart">&times;</button>
      </div>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart-item"
          >
            <img
              :src="item.product.image"
              :alt="item.product.name"
              class="item-image"
            />
            <div class="item-details">
              <h4>{{ item.product.name }}</h4>
              <p class="item-price">
                NPR {{ item.product.price.toLocaleString() }}
              </p>
              <div class="quantity-controls">
                <button @click="updateQuantity(item, -1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item, 1)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="removeItem(item.id)">×</button>
          </div>
        </div>

        <div class="cart-footer">
          <div class="total">
            <strong>Total: NPR {{ totalPrice.toLocaleString() }}</strong>
          </div>
          <button class="checkout-btn" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CartModal",

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cartItems: [],
      loading: false,
    };
  },

  emits: ["close"],

  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
    },
  },

  watch: {
    isOpen(val) {
      if (val) {
        this.fetchCartItems();
      }
    },
  },

  methods: {
    closeCart() {
      this.$emit("close");
    },

    async fetchCartItems() {
      this.loading = true;
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/cart/");
        this.cartItems = res.data.results || res.data;
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        this.loading = false;
      }
    },

    async updateQuantity(item, change) {
  const newQty = item.quantity + change;
  if (newQty <= 0) return this.removeItem(item.id);

  try {
    await api.patch(`/api/cart/${item.id}/`, { quantity: newQty });
    item.quantity = newQty;
  } catch (err) {
    console.error("Failed to update quantity", err);
  }
},


    async removeItem(cartItemId) {
  try {
    await api.delete(`/api/cart/${cartItemId}/`);
    this.cartItems = this.cartItems.filter((i) => i.id !== cartItemId);
  } catch (err) {
    console.error("Failed to remove item", err);
  }
},

    checkout() {
      alert(`Checkout total: NPR ${this.totalPrice.toLocaleString()}`);
    },
  },
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.cart-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;
  color: #666;
}

.cart-content {
  max-height: 60vh;
  overflow-y: auto;
}

.cart-items {
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  gap: 15px;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
}

.item-price {
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #1a9e28;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls span {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6fc6f5;
  padding: 5px;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
}

.total {
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #6fc6f5 0%, #7ed9b0 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.checkout-btn:hover {
  transform: translateY(-1px);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .cart-modal {
    width: 95%;
    max-height: 90vh;
  }

  .cart-item {
    padding: 12px 15px;
    gap: 10px;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }

  .item-details h4 {
    font-size: 14px;
  }

  .quantity-controls button {
    width: 25px;
    height: 25px;
  }

  .quantity-controls span {
    min-width: 25px;
  }
}

@media (max-width: 480px) {
  .cart-header {
    padding: 15px;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .item-details {
    width: 100%;
  }

  .remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .cart-footer {
    padding: 15px;
  }
}
</style>
