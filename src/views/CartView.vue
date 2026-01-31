<template>
  <div class="cart-page">
    <!-- Empty Cart -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <h2>Your cart is empty</h2>
      <p>No items selected for the cart</p>
      <button class="continue-shopping-btn" @click="continueShopping">
        Continue Shopping
      </button>
    </div>

    <!-- Cart with Items -->
    <div v-else class="cart-content">
      <!-- LEFT -->
      <div class="cart-left">
        <div class="shop-block" v-for="item in cartItems" :key="item.id">
          <div class="shop-title">
            <span>Product</span>
            <button class="delete-item-btn" @click="deleteItem(item)">🗑</button>
          </div>

          <div class="item-row">
            <input
              type="checkbox"
              :checked="item.selected"
              @change="toggleItemSelection(item)"
              class="item-checkbox"
            />

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
              <span class="price"> Rs. {{ item.price }} </span>
            </div>

            <div class="qty">
              <button @click="updateQuantity(item, -1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item, 1)">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="cart-right">
        <h3>Order Summary</h3>

        <div class="summary-row">
          <span>Subtotal ({{ selectedItemsCount }} items)</span>
          <span>Rs. {{ subtotal }}</span>
        </div>

        <div class="summary-row">
          <span>Shipping Fee</span>
          <span>Rs. {{ shippingFee }}</span>
        </div>

        <div class="voucher">
          <input
            type="text"
            placeholder="Enter Voucher Code"
            v-model="voucherCode"
          />
          <button @click="applyVoucher">APPLY</button>
        </div>

        <div class="summary-total">
          <span>Total</span>
          <span class="total-price">Rs. {{ total }}</span>
        </div>

        <button class="checkout-btn" @click="checkout">
          PROCEED TO CHECKOUT ({{ selectedItemsCount }})
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const cartState = inject("cartState");
    if (!cartState || !cartState.items) return {};

    const cartItems = cartState.items;
    const voucherCode = ref("");
    
    const toggleItemSelection = (item) => {
      item.selected = !item.selected;
    };

    const deleteItem = (item) => cartState.removeFromCart(item.id);
    const updateQuantity = (item, change) => {
      const newQty = item.quantity + change;
      cartState.updateQuantity(item.id, newQty);
    };
    const continueShopping = () => router.push("/");
    const goToProductDetail = (item) => router.push(`/product/${item.id}`);
    const checkout = () => {
      if (!cartItems.value.length) return alert("Your cart is empty!");
      router.push("/checkout");
    };

    const selectedItemsCount = computed(
      () => cartItems.value.filter((i) => i.selected).length,
    );
    const subtotal = computed(() =>
      cartItems.value
        .filter((i) => i.selected)
        .reduce((t, i) => t + (i.price || 0) * i.quantity, 0),
    );
    const shippingFee = computed(() => (subtotal.value > 5000 ? 0 : 200));
    const total = computed(() => subtotal.value + shippingFee.value);

    return {
      cartItems,
      voucherCode,
      deleteItem,
      updateQuantity,
      continueShopping,
      goToProductDetail,
      checkout,
      toggleItemSelection,
      selectedItemsCount,
      subtotal,
      shippingFee,
      total,
    };
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}

.cart-content {
  display: flex;
  gap: 20px;
}

.cart-left {
  flex: 0 0 60%;
}

.cart-header {
  background: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #eee;
  margin-bottom: 15px;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
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

.delete-item-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: red;
  padding: 5px;
}

.delete-item-btn:hover {
  color: #6fc6f5;
}

.item-row {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 15px;
}

.item-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.product-img {
  width: 80px;
  height: 80px;
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 14px;
  margin-bottom: 5px;
}

.meta {
  font-size: 12px;
  color: #777;
}

.stock {
  color: #6fc6f5;
  font-size: 12px;
}

.item-price {
  width: 120px;
}

.price {
  color: #6fc6f5;
  font-weight: bold;
}

.old {
  text-decoration: line-through;
  font-size: 12px;
  color: #999;
}

.qty {
  display: flex;
  gap: 10px;
}

.qty button {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: #fff;
}

/* RIGHT */
.cart-right {
  flex: 0 0 40%;
  background: #fff;
  border: 1px solid #eee;
  padding: 20px;
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.voucher {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.voucher input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
}

.voucher button {
  background: rgb(100, 195, 100);
  color: #fff;
  border: none;
  padding: 8px 14px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 20px 0;
}

.total-price {
  color: #6fc6f5;
}

.checkout-btn {
  width: 100%;
  background: #6fc6f5;
  color: #fff;
  border: none;
  padding: 12px;
}

.empty-cart {
  text-align: center;
  padding: 100px 20px;
  background: #fff;
  border-radius: 8px;
  max-width: 600px;
  margin: 50px auto;
  min-height: 400px;
}

.empty-cart h2 {
  color: #333;
  margin-bottom: 10px;
}

.empty-cart p {
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
  background: #6fc6f5;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }

  .cart-left {
    flex: none;
    order: 1;
  }

  .cart-right {
    flex: none;
    order: 2;
  }

  .empty-cart {
    padding: 30px 15px;
  }
}
</style>
