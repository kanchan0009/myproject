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
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p class="item-price">
                NPR {{ (item.price || 0).toLocaleString() }}
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
import { inject, computed } from "vue";

export default {
  name: "CartModal",
  props: { isOpen: { type: Boolean, default: false } },
  emits: ["close"],

  setup(props, { emit }) {
    const cartState = inject("cartState");
    if (!cartState) throw new Error("cartState not provided");

    const cartItems = cartState.items;

    const closeCart = () => emit("close");

    const updateQuantity = (item, change) => {
      const newQty = item.quantity + change;
      cartState.updateQuantity(item.id, newQty);
    };

    const removeItem = (id) => cartState.removeFromCart(id);

    const checkout = () => {
      if (!cartItems.value.length) return alert("Your cart is empty!");
      const total = cartItems.value.reduce(
        (sum, i) => sum + (i.price || 0) * i.quantity,
        0,
      );
      alert(`Checkout total: NPR ${total.toLocaleString()}`);
    };

    const totalPrice = computed(() =>
      cartItems.value.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0),
    );

    return {
      cartItems,
      closeCart,
      updateQuantity,
      removeItem,
      checkout,
      totalPrice,
    };
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
