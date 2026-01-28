<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <!-- LEFT -->
      <div class="payment-section">
        <h2>Select Payment Method</h2>

        <div class="payment-options">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            class="payment-card"
            :class="{ active: selectedMethod === method.id }"
            @click="
              selectedMethod = selectedMethod === method.id ? null : method.id
            "
          >
            <img :src="method.icon" />
            <h4>{{ method.title }}</h4>
            <p>{{ method.subtitle }}</p>
          </div>
        </div>

        <!-- Card Payment Container -->
        <div v-if="selectedMethod === 'card'" class="card-payment-container">
          <div class="card-payment">
            <!-- Card Icons -->
            <div class="card-icons">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
              />
            </div>

            <!-- Card Number -->
            <div class="form-group">
              <label><span>*</span> Card number</label>
              <input
                v-model="cardForm.cardNumber"
                type="text"
                placeholder="Card number"
              />
            </div>

            <!-- Name -->
            <div class="form-group">
              <label><span>*</span> Name on card</label>
              <input
                v-model="cardForm.name"
                type="text"
                placeholder="Name on card"
              />
            </div>

            <!-- Expiry + CVV -->
            <div class="row">
              <div class="form-group">
                <label><span>*</span> Expiry date</label>
                <input
                  v-model="cardForm.expiry"
                  type="text"
                  placeholder="MM/YY"
                />
              </div>

              <div class="form-group">
                <label>
                  <span>*</span> CVV
                  <span class="info">ⓘ</span>
                </label>
                <input
                  v-model="cardForm.cvv"
                  type="password"
                  placeholder="CVV"
                />
              </div>
            </div>

            <!-- Save Card -->
            <div class="save-card">
              <input v-model="cardForm.saveCard" type="checkbox" />
              <div class="save-card-text">
                <strong>Save Card</strong>
                <p>
                  We will save this card for your convenience. If required, you
                  can remove the card in the "Payment Options" section in the
                  "Account" menu.
                </p>
              </div>
            </div>

            <!-- Pay Button -->
            <button class="pay-btn" @click="processPayment">Pay Now</button>
          </div>
        </div>

        <!-- eSewa Payment Container -->
        <div v-if="selectedMethod === 'esewa'" class="esewa-payment-container">
          <div class="esewa-payment">
            <h3>Scan QR Code to Pay</h3>
            <p>
              Scan the QR code below using your eSewa mobile app to complete the
              payment.
            </p>
            <div class="qr-code">
              <img
                src="https://via.placeholder.com/200x200?text=QR+Code"
                alt="eSewa QR Code"
              />
            </div>
            <p class="amount">Amount: Rs. {{ totalAmount }}</p>
            <button class="pay-btn" @click="processPayment">
              Confirm Payment
            </button>
          </div>
        </div>

        <!-- Cash on Delivery Container -->
        <div v-if="selectedMethod === 'cod'" class="cod-container">
          <ul class="cod-rules">
            <li>
              You may pay in cash to our courier upon receiving your parcel at
              the doorstep.
            </li>
            <li>
              Cash Payment Fee (2%), with a maximum cap of Rs. 20 applies only
              to Cash on Delivery payment method. There is no extra fee when
              using other payment methods.
            </li>
            <li>
              Before agreeing to receive the parcel, check if your delivery
              status has been updated to <strong>'Out for Delivery'</strong> on
              PhysioNepal App.
            </li>
            <li>
              Before receiving, confirm that the airway bill shows that the
              parcel is from PhysioNepal.
            </li>
            <li>
              Before you make payment to the courier, confirm your order number,
              sender information, and tracking number on the parcel.
            </li>
          </ul>

          <button class="confirm-btn" @click="processPayment">
            Confirm Order
          </button>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="order-summary">
        <h3>Order Summary</h3>

        <div class="summary-row">
          <span>Subtotal ({{ totalItems }} items)</span>
          <span>Rs. {{ subtotal }}</span>
        </div>

        <div class="summary-row">
          <span>Delivery Fee</span>
          <span>Rs. {{ deliveryFee }}</span>
        </div>

        <div class="total-row">
          <span>Total Amount</span>
          <span class="total">Rs. {{ totalAmount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "PaymentMethod",
  setup() {
    const cartState = inject("cartState");
    const router = useRouter();

    const selectedMethod = ref(null);
    const paymentMethods = [
      {
        id: "card",
        title: "Credit/Debit Card",
        subtitle: "Credit/Debit Card",
        icon: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
      },
      {
        id: "esewa",
        title: "eSewa Mobile Wallet",
        subtitle: "eSewa Mobile Wallet",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Esewa_logo.png",
      },
      {
        id: "cod",
        title: "Cash on Delivery",
        subtitle: "Cash on Delivery",
        icon: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
      },
    ];

    // Form data for card payment
    const cardForm = ref({
      cardNumber: "",
      name: "",
      expiry: "",
      cvv: "",
      saveCard: false,
    });

    // Computed properties for order summary
    const cartItems = computed(() => cartState.items);
    const totalItems = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });
    const subtotal = computed(() => {
      return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    });
    const deliveryFee = computed(() => {
      return subtotal.value > 5000 ? 0 : 200;
    });
    const totalAmount = computed(() => {
      return subtotal.value + deliveryFee.value;
    });

    // Validation
    const validateCardForm = () => {
      if (!cardForm.value.cardNumber.trim()) {
        cartState.showToast("Card number is required", "error");
        return false;
      }
      if (!cardForm.value.name.trim()) {
        cartState.showToast("Name on card is required", "error");
        return false;
      }
      if (!cardForm.value.expiry.trim()) {
        cartState.showToast("Expiry date is required", "error");
        return false;
      }
      if (!cardForm.value.cvv.trim()) {
        cartState.showToast("CVV is required", "error");
        return false;
      }
      return true;
    };

    // Payment processing
    const processPayment = () => {
      if (!selectedMethod.value) {
        cartState.showToast("Please select a payment method", "error");
        return;
      }

      if (selectedMethod.value === "card" && !validateCardForm()) {
        return;
      }

      // Simulate payment processing
      setTimeout(() => {
        cartState.showToast("Payment successful! Order placed.", "success");
        // Clear cart
        cartState.items = [];
        // Navigate to home
        router.push("/");
      }, 1000);
    };

    return {
      selectedMethod,
      paymentMethods,
      cardForm,
      cartItems,
      totalItems,
      subtotal,
      deliveryFee,
      totalAmount,
      processPayment,
    };
  },
};
</script>

<style scoped>
.checkout-page {
  background: #f4f6f8;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Alert */
.alert {
  background: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

/* Layout */
.checkout-container {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  overflow: hidden;
}

/* Payment Section */
.payment-section {
  flex: 2;
}

.payment-section h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: left;
}

.payment-options {
  display: flex;
  gap: 20px;
}

.payment-card {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  width: 150px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.payment-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.payment-card.active {
  border-color: #ff7a00;
}

.payment-card img {
  width: 40px;
  margin-bottom: 10px;
}

.payment-card h4 {
  margin: 5px 0;
  font-size: 16px;
}

.payment-card p {
  font-size: 13px;
  color: #666;
}

/* Order Summary */
.order-summary {
  flex: 1;
  background: #fff;
  padding: 25px 30px;
  margin-right: 50px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.order-summary h3 {
  margin-bottom: 20px;
}

.summary-row,
.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
}

.total-row {
  border-top: 1px solid #eee;
  padding-top: 15px;
  font-size: 16px;
}

.total {
  color: #ff7a00;
  font-weight: bold;
}

/* Card Payment Container */
.card-payment-container {
  height: 600px;
  width: 60%;
  margin-top: 20px;
}

.card-payment {
  max-width: 400px;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Icons */
.card-icons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.card-icons img {
  height: 28px;
}

/* Form */
.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

label span {
  color: red;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdcdc;
  font-size: 14px;
  border-radius: 2px;
}

input:focus {
  outline: none;
  border-color: #ff7a00;
}

/* Row */
.row {
  display: flex;
  gap: 20px;
}

.row .form-group {
  flex: 1;
}

/* CVV info */
.info {
  font-size: 12px;
  color: #0099cc;
  margin-left: 5px;
  cursor: pointer;
}

/* Save Card */
.save-card {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  font-size: 14px;
}

.save-card input {
  margin-top: 4px;
  width: 14px;
  height: 14px;
}

.save-card p {
  font-size: 12px;
  color: #777;
  margin: 4px 0 0;
}

.save-card-text {
  text-align: left;
}

/* Button */
.pay-btn {
  width: 100%;
  padding: 14px;
  background: #ff7a00;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;
}

.pay-btn:hover {
  background: #e96b00;
}

/* eSewa Payment */
.esewa-payment-container {
  width: 60%;
  margin-top: 20px;
}

.esewa-payment {
  max-width: 400px;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.esewa-payment h3 {
  margin-bottom: 10px;
}

.esewa-payment p {
  margin-bottom: 20px;
  color: #666;
}

.qr-code {
  margin-bottom: 20px;
}

.qr-code img {
  width: 200px;
  height: 200px;
}

.amount {
  font-weight: bold;
  margin-bottom: 20px;
}

/* Cash on Delivery */
.cod-container {
  background: #fff;
  padding: 30px;
  max-width: 800px;
  font-family: Arial, sans-serif;
  margin-top: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: left;
}

/* Rules */
.cod-rules {
  margin-bottom: 30px;
}

.cod-rules p {
  font-size: 15px;
  color: #111;
  margin-bottom: 14px;
  line-height: 1.5;
}

/* Button */
.confirm-btn {
  background: #ff7a00;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 2px;
  width: 100%;
  text-align: center;
}

.confirm-btn:hover {
  background: #e96b00;
}

/* Mobile phones */
@media (max-width: 480px) {
  .checkout-page {
    padding: 10px;
  }

  .checkout-container {
    flex-direction: column;
    gap: 20px;
  }

  .payment-section {
    flex: none;
  }

  .payment-section h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .payment-options {
    flex-direction: row;
    gap: 1px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .payment-card {
    flex: 1;
    min-width: 0;
    padding: 2px;
    text-align: center;
  }

  .payment-card img {
    width: 25px;
    margin-bottom: 2px;
  }

  .payment-card h4 {
    margin: 1px 0;
    font-size: 13px;
  }

  .payment-card p {
    margin: 0;
    font-size: 10px;
  }

  .order-summary {
    margin-right: 0;
    padding: 20px;
  }

  .order-summary h3 {
    font-size: 18px;
  }

  .card-payment-container {
    width: 100%;
    height: auto;
    margin-top: 15px;
  }

  .card-payment {
    max-width: none;
    padding: 15px;
  }

  .esewa-payment-container {
    width: 100%;
    margin-top: 15px;
  }

  .esewa-payment {
    max-width: none;
    padding: 15px;
  }

  .qr-code img {
    width: 150px;
    height: 150px;
  }

  .cod-container {
    padding: 20px;
    max-width: none;
  }

  .cod-rules p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-size: 13px;
  }

  input {
    padding: 10px;
    font-size: 13px;
  }

  .row {
    gap: 10px;
  }

  .pay-btn,
  .confirm-btn {
    padding: 12px;
    font-size: 14px;
  }

  .save-card {
    font-size: 13px;
  }

  .save-card p {
    font-size: 11px;
  }
}
</style>
