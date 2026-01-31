<
<template>
  <div class="checkout-container">
    <h2>Select Payment Method</h2>

    <div class="checkout-content">
      <!-- Left Section: Payment Methods & Details -->
      <div class="payment-section">
        <!-- Payment Method Row -->
        <div class="payment-row">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            class="payment-card"
            :class="{ active: selectedMethod === method.id }"
            @click="selectedMethod = method.id"
          >
            <img :src="method.icon" />
            <div>
              <strong>{{ method.title }}</strong>
              <p>{{ method.subtitle }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Details -->
        <div class="payment-details">
          <!-- Card Payment -->
          <div v-if="selectedMethod === 'card'" class="details-box">
            <h3>Pay with Card</h3>
            <div class="form-group">
              <label>Card Number</label>
              <input
                v-model="cardForm.cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div class="form-group">
              <label>Card Holder Name</label>
              <input
                v-model="cardForm.name"
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div class="row">
              <div class="form-group">
                <label>Expiry Date</label>
                <input
                  v-model="cardForm.expiry"
                  type="text"
                  placeholder="MM/YY"
                />
              </div>
              <div class="form-group">
                <label>CVV</label>
                <input
                  v-model="cardForm.cvv"
                  type="password"
                  placeholder="***"
                />
              </div>
            </div>
            <button class="pay-btn" @click="placeOrder">
              Pay Rs. {{ totalAmount }}
            </button>
          </div>

          <!-- eSewa Payment -->
          <div v-if="selectedMethod === 'esewa'" class="details-box">
            <h3>Pay with eSewa</h3>
            <img
              class="qr"
              src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Qr-1024.png"
              alt="QR Code"
            />
            <button class="pay-btn" @click="placeOrder">
              Scan to Pay Rs. {{ totalAmount }}
            </button>
          </div>

          <!-- Cash on Delivery -->
          <div v-if="selectedMethod === 'cod'" class="details-box">
            <h3>Cash on Delivery</h3>
            <ul>
              <li>Pay in cash when the product is delivered.</li>
              <li>Please keep the exact amount ready.</li>
              <li>Delivery agent will contact you before delivery.</li>
            </ul>
            <button class="pay-btn" @click="placeOrder">
              Confirm Order Rs. {{ totalAmount }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right Section: Order Summary -->
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="row">
          <span
            >Subtotal ({{ cartItems.length }} items + shipping fee
            included)</span
          >
          <span>Rs. {{ subtotal }}</span>
        </div>
        <div class="row">
          <span>Shipping Fee</span>
          <span>Rs. {{ deliveryFee }}</span>
        </div>
        <div class="total-row">
          <span>Total Amount</span>
          <span class="total-amount">Rs. {{ totalAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "PaymentMethod",
  setup() {
    const router = useRouter();
    const cartState = inject("cartState");
    const selectedMethod = ref("card");

    const cardForm = ref({
      cardNumber: "",
      name: "",
      expiry: "",
      cvv: "",
    });

    const paymentMethods = [
      {
        id: "card",
        title: "Credit/Debit Card",
        subtitle: "Pay with your card",
        icon: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
      },
      {
        id: "esewa",
        title: "eSewa Mobile Wallet",
        subtitle: "Pay with eSewa",
        icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Esewa_logo.png",
      },
      {
        id: "cod",
        title: "Cash on Delivery",
        subtitle: "Pay at delivery",
        icon: "https://cdn-icons-png.flaticon.com/512/2331/2331943.png",
      },
    ];

    const cartItems = computed(() => cartState.items?.value || []);

    const subtotal = computed(() =>
      cartItems.value.reduce((sum, i) => sum + i.price * i.quantity, 0),
    );

    const deliveryFee = computed(() => (subtotal.value > 5000 ? 0 : 200));

    const totalAmount = computed(() => subtotal.value + deliveryFee.value);

    const showToast = (msg) => alert(msg);

    const getShippingDetails = () => {
      const data = localStorage.getItem("shippingDetails");
      return data ? JSON.parse(data) : null;
    };

    const validateCardForm = () => {
      if (!cardForm.value.cardNumber.trim())
        return showToast("Card number required");
      if (!cardForm.value.name.trim())
        return showToast("Card holder name required");
      if (!cardForm.value.expiry.trim())
        return showToast("Expiry date required");
      if (!cardForm.value.cvv.trim()) return showToast("CVV required");
      return true;
    };
    const placeOrder = async () => {
      // 1️⃣ Check payment method
      if (!selectedMethod.value) {
        return showToast("Please select a payment method");
      }
      if (selectedMethod.value === "card" && !validateCardForm()) return;

      // 2️⃣ Check shipping details
      const shippingDetails = getShippingDetails();
      if (!shippingDetails) {
        showToast("Please fill shipping details first");
        router.push("/shipping-detail");
        return;
      }

      // 3️⃣ Check cart
      if (!cartItems.value.length) {
        showToast("Your cart is empty");
        router.push("/products");
        return;
      }

      // 4️⃣ Check auth token
      const token = localStorage.getItem("authToken");
      if (!token) {
        showToast("You must be logged in to place an order.");
        router.push("/login");
        return;
      }

      // 5️⃣ Construct payload matching Django expected fields
      const orderPayload = {
        customer: shippingDetails.user_id || null,
        customer_name: shippingDetails.shipping_full_name || "",
        status: "pending",
        shipping_full_name: shippingDetails.shipping_full_name || "",
        shipping_phone: shippingDetails.shipping_phone || "",
        shipping_address: shippingDetails.shipping_address || "",
        shipping_city: shippingDetails.shipping_city || "",
        shipping_state: shippingDetails.shipping_state || "",
        shipping_postal_code: shippingDetails.shipping_postal_code || "",
        subtotal: parseFloat(subtotal.value.toFixed(2)),
        shipping_cost: parseFloat(deliveryFee.value.toFixed(2)),
        total: parseFloat(totalAmount.value.toFixed(2)),
        notes: shippingDetails.notes || "",
        payment_method: selectedMethod.value,
        items: cartItems.value.map((i) => ({
          product_id: i.id ?? null, // MUST match Django
          product_name: i.name ?? "",
          quantity: Number(i.quantity) || 1,
          price: parseFloat(i.price.toFixed(2)) || 0,
          subtotal: parseFloat((i.price * i.quantity).toFixed(2)) || 0,
        })),
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/orders/",
          orderPayload,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        showToast("Order placed successfully!");
        cartState.items.value = [];
        localStorage.removeItem("shippingDetails");
        router.push("/");
      } catch (error) {
        console.error("Axios error:", error.response?.data || error);

        // Show meaningful message
        if (error.response?.data?.detail) {
          showToast(error.response.data.detail);
        } else if (error.response?.data) {
          showToast("Failed to place order. Check server logs.");
        } else {
          showToast("Network or server error occurred.");
        }
      }
    };

    return {
      selectedMethod,
      paymentMethods,
      cartItems,
      subtotal,
      deliveryFee,
      totalAmount,
      cardForm,
      placeOrder,
    };
  },
};
</script>

<style scoped>
.checkout-container {
  background: #f5f6f8;
  padding: 24px;
  font-family: Arial, sans-serif;
}

.checkout-content {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

/* Left Section */
.payment-section {
  flex: 2;
}

.payment-row {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.payment-card {
  background: #fff;
  padding: 16px;
  display: flex;
  gap: 12px;
  width: 240px;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid transparent;
  align-items: center;
}

.payment-card.active {
  border-color: rgb(85, 184, 85);
}

.payment-card img {
  width: 40px;
  height: 40px;
}

.payment-card p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #777;
}

.payment-details {
  background: #fff;
  padding: 24px;
  border-radius: 6px;
  max-width: 500px;
}

.details-box h3 {
  margin-bottom: 16px;
}

.qr {
  width: 200px;
  display: block;
  margin: 16px auto;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.row {
  display: flex;
  gap: 12px;
}

.pay-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: rgb(85, 184, 85);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

/* Right Section */
.order-summary {
  background: #ffffff;
  padding: 24px;
  border-radius: 6px;
  width: 360px;
  font-family: Arial, sans-serif;
  flex: 1;
}

.order-summary h3 {
  margin-bottom: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;
}

.label {
  max-width: 240px;
}

.value {
  font-weight: 500;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.total-amount {
  font-size: 26px;
  font-weight: bold;
  color: rgb(85, 184, 85);
}
</style>
