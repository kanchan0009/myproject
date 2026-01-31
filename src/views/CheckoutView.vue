<template>
  <div class="checkout-page">
    <!-- LEFT -->
    <div class="left">
      <!-- Shipping Address -->
      <div class="card">
        <div class="card-header">
          <h3>Shipping Address</h3>
          <a href="#" @click.prevent="editShippingAddress">EDIT</a>
        </div>

        <div v-if="!isEditingAddress">
          <p class="name">{{ address.name }} &nbsp; {{ address.phone }}</p>

          <span class="tag">{{ address.tag }}</span>

          <p class="address">
            {{ address.fullAddress }}
          </p>

          <div class="pickup-box">
            Collect your parcels from a nearby location at a minimal delivery
            fee →
            <small>{{ address.pickupInfo }}</small>
          </div>
        </div>

        <div v-else class="edit-address-form">
          <div class="form-group">
            <label for="edit-name">Full Name</label>
            <input
              id="edit-name"
              v-model="editAddress.name"
              type="text"
              placeholder="Enter full name"
            />
          </div>

          <div class="form-group">
            <label for="edit-phone">Phone Number</label>
            <input
              id="edit-phone"
              v-model="editAddress.phone"
              type="tel"
              placeholder="Enter phone number"
            />
          </div>

          <div class="form-group">
            <label for="edit-tag">Address Tag</label>
            <input
              id="edit-tag"
              v-model="editAddress.tag"
              type="text"
              placeholder="e.g., Home, Office"
            />
          </div>

          <div class="form-group">
            <label for="edit-address">Full Address</label>
            <textarea
              id="edit-address"
              v-model="editAddress.fullAddress"
              placeholder="Enter complete address"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="edit-pickup">Pickup Location</label>
            <input
              id="edit-pickup"
              v-model="editAddress.pickupInfo"
              type="text"
              placeholder="Enter pickup location"
            />
          </div>

          <div class="form-actions">
            <button class="save-btn" @click="saveShippingAddress">
              Save Address
            </button>
            <button class="cancel-btn" @click="cancelEdit">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Package -->
      <div class="card">
        <div class="card-header">
          <h3>Package 1 of 1</h3>
          <span class="fulfilled"
            >Fulfilled by {{ packageInfo.fulfilledBy }}</span
          >
        </div>

        <div class="delivery-box">
          <div class="radio"></div>
          <div>
            <strong>Rs. {{ deliveryFee }}</strong>
            <p>Standard Delivery</p>
            <small>{{ packageInfo.deliveryDate }}</small>
          </div>
        </div>

        <!-- Products from Cart -->
        <div v-for="item in cartItems" :key="item.id" class="product">
          <img :src="item.image" />
          <div class="product-info">
            <h4>{{ item.name }}</h4>
            <p>Professional physiotherapy equipment</p>
          </div>

          <div class="price">
            <span class="new">Rs. {{ item.price }}</span>
          </div>

          <div class="qty">Qty: {{ item.quantity }}</div>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="right">
      <div class="card">
        <h3>Promotion</h3>
        <div class="promo">
          <input type="text" placeholder="Enter Store/Daraz Code" />
          <button>APPLY</button>
        </div>

        <div class="edit-row">
          <h3>Invoice and Contact Info</h3>
          <a href="#" @click.prevent="openSideMenu">Edit</a>
        </div>

        <h3>Order Detail</h3>

        <div class="row">
          <span>Items Total ({{ totalItems }} Items)</span>
          <span>Rs. {{ itemsTotal }}</span>
        </div>

        <div class="row">
          <span>Delivery Fee</span>
          <span>Rs. {{ deliveryFee }}</span>
        </div>

        <hr />

        <div class="total">
          <span>Total:</span>
          <span class="total-price">Rs. {{ grandTotal }}</span>
        </div>

        <small>All taxes included</small>

        <button class="pay-btn" @click="proceedToPay">Proceed to Pay</button>
      </div>
    </div>

    <!-- Side Menu -->
    <div v-if="showSideMenu" class="side-menu" @click.self="closeSideMenu">
      <div class="side-menu-content">
        <InvoiceContactInfo
          :initial-email="invoiceContact.email"
          :initial-billing-address="invoiceContact.billingAddress"
          @close="closeSideMenu"
          @update:email="saveInvoiceContact"
          @update:billingAddress="saveInvoiceContact"
        />
      </div>
    </div>

    <!-- Toast Notification -->
    <ToastNotification
      ref="toast"
      :message="toastMessage"
      :type="toastType"
      @close="onToastClose"
    />
  </div>
</template>

<script>
import { inject, computed, ref, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import InvoiceContactInfo from "@/components/InvoiceContactInfo.vue";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  name: "CheckoutView",
  components: {
    InvoiceContactInfo,
    ToastNotification,
  },
  setup() {
    const cartState = inject("cartState");
    const router = useRouter();

    /* ---------------- CART ---------------- */

    const cartItems = computed(() => cartState.items?.value || []);

    const totalItems = computed(() =>
      (cartItems.value || []).reduce((t, i) => t + i.quantity, 0),
    );

    const itemsTotal = computed(() =>
      (cartItems.value || []).reduce((t, i) => t + i.price * i.quantity, 0),
    );

    const deliveryFee = computed(() => (itemsTotal.value > 5000 ? 0 : 200));

    const grandTotal = computed(() => itemsTotal.value + deliveryFee.value);

    /* ---------------- STATE ---------------- */

    const address = ref({});
    const invoiceContact = ref({});
    const packageInfo = ref({});
    const isEditingAddress = ref(false);
    const showSideMenu = ref(false);
    const loading = ref(false);

    const editAddress = ref({
      name: "",
      phone: "",
      tag: "",
      fullAddress: "",
      pickupInfo: "",
    });

    const toastMessage = ref("");
    const toastType = ref("success");
    const toast = ref(null);

    /* ---------------- ADDRESS ---------------- */

    const editShippingAddress = () => {
      router.push("/shipping-detail");
    };

    const saveShippingAddress = () => {
      if (!editAddress.value.name.trim()) {
        toastMessage.value = "Full Name is required.";
        toastType.value = "error";
        return;
      }
      if (!editAddress.value.phone.trim()) {
        toastMessage.value = "Phone Number is required.";
        toastType.value = "error";
        return;
      }
      if (!editAddress.value.fullAddress.trim()) {
        toastMessage.value = "Full Address is required.";
        toastType.value = "error";
        return;
      }

      address.value = { ...editAddress.value };
      isEditingAddress.value = false;
      toastMessage.value = "Address updated successfully!";
      toastType.value = "success";
    };

    const cancelEdit = () => {
      isEditingAddress.value = false;
    };

    /* ---------------- ORDER API ---------------- */

    const proceedToPay = async () => {
      // Always navigate to payment page - let the payment page handle validation
      toastMessage.value = "Proceeding to payment...";
      toastType.value = "info";
      router.push("/payment");
    };

    /* ---------------- UI HELPERS ---------------- */

    const openSideMenu = () => (showSideMenu.value = true);
    const closeSideMenu = () => (showSideMenu.value = false);

    const saveInvoiceContact = (field, value) => {
      invoiceContact.value[field] = value;
      localStorage.setItem(
        "invoiceContact",
        JSON.stringify(invoiceContact.value),
      );
    };

    const onToastClose = () => {
      toastMessage.value = "";
    };

    /* ---------------- INIT ---------------- */

    onMounted(() => {
      fetch("/data/checkout.json")
        .then((res) => res.json())
        .then((data) => {
          // Load shipping details from localStorage if available
          const savedShipping = localStorage.getItem("shippingDetails");
          if (savedShipping) {
            const shippingData = JSON.parse(savedShipping);
            address.value = {
              name: shippingData.shipping_full_name,
              phone: shippingData.shipping_phone,
              fullAddress: shippingData.shipping_address,
              city: shippingData.shipping_city,
              state: shippingData.shipping_state,
              postalCode: shippingData.shipping_postal_code,
              tag: "Home", // Default tag
              pickupInfo: "Nawalparasi Branch", // Default pickup
            };
          } else {
            address.value = data.address || {};
          }

          packageInfo.value = data.package || {};
          editAddress.value = { ...address.value };

          const saved = localStorage.getItem("invoiceContact");
          invoiceContact.value = saved
            ? JSON.parse(saved)
            : data.invoiceContact || {};
        });
    });

    watch(toastMessage, (msg) => {
      if (msg) {
        nextTick(() => toast.value?.show());
      }
    });

    return {
      cartItems,
      totalItems,
      itemsTotal,
      deliveryFee,
      grandTotal,
      proceedToPay,
      address,
      invoiceContact,
      packageInfo,
      isEditingAddress,
      showSideMenu,
      editAddress,
      editShippingAddress,
      saveShippingAddress,
      cancelEdit,
      openSideMenu,
      closeSideMenu,
      toastMessage,
      toastType,
      toast,
      onToastClose,
      loading,
    };
  },
};
</script>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 30px auto;
  display: flex;
  gap: 20px;
  font-family: Arial, sans-serif;
}

.left {
  flex: 3;
}

.right {
  flex: 1;
}

.card {
  background: #fff;
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
}

.card-header,
.edit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header a,
.edit-row a {
  color: #00a0e9;
  font-size: 13px;
}

.name {
  font-weight: bold;
}

.tag {
  background: #75cef5;
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.address {
  margin: 10px 0;
}

.pickup-box {
  border: 1px dashed #00a0e9;
  padding: 12px;
  color: #00a0e9;
  font-size: 14px;
}

.pickup-box small {
  display: block;
  color: #666;
  margin-top: 5px;
}

/* Delivery */
.delivery-box {
  border: 1px solid #00a0e9;
  padding: 15px;
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.radio {
  width: 20px;
  height: 20px;
  background: #00a0e9;
  border-radius: 50%;
}

/* Product */
.product {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product img {
  width: 80px;
}

.product-info {
  flex: 1;
}

.price {
  text-align: right;
}

.price .new {
  color: #086239;
  font-weight: bold;
}

.price .old {
  display: block;
  text-decoration: line-through;
  color: #999;
  font-size: 12px;
}

.discount {
  color: #111;
  font-size: 12px;
}

.qty {
  margin-left: 20px;
}

/* Right */
.promo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.promo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
}

.promo button {
  background: #6fc6f5;
  color: #fff;
  border: none;
  padding: 8px 16px;
}

.row,
.total {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.total-price {
  color: #6fc6f5;
  font-size: 18px;
}

.pay-btn {
  width: 100%;
  background: #6fc6f5;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 15px;
  margin-top: 15px;
}

.edit-address-form {
  margin-top: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 60px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  background: #6fc6f5;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* Side Menu */
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
}

.side-menu-content {
  width: 500px;
  height: 100vh;
  background: #fff;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-page {
    flex-direction: row;
    gap: 8px;
    padding: 8px;
    margin: 15px auto;
  }

  .left {
    flex: 2;
  }

  .right {
    flex: 1;
  }

  .card {
    padding: 12px;
    margin-bottom: 12px;
  }

  .card h3 {
    font-size: 16px;
  }

  .name {
    font-size: 14px;
  }

  .address {
    font-size: 12px;
  }

  .pickup-box {
    font-size: 11px;
    padding: 8px;
  }

  .product h4 {
    font-size: 14px;
  }

  .price .new {
    font-size: 14px;
  }

  .total-price {
    font-size: 14px;
  }

  .pay-btn {
    font-size: 12px;
    padding: 10px;
  }

  .promo input {
    padding: 6px;
  }

  .promo button {
    padding: 6px 12px;
    font-size: 12px;
  }

  .row,
  .total {
    margin: 8px 0;
  }

  .product {
    gap: 10px;
  }

  .product img {
    width: 60px;
  }

  .delivery-box {
    padding: 10px;
    gap: 10px;
  }

  .radio {
    width: 16px;
    height: 16px;
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  .checkout-page {
    flex-direction: column;
    gap: 3px;
    padding: 3px;
    margin: 8px auto;
    max-width: 100%;
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
  }

  .card {
    padding: 6px;
    margin-bottom: 6px;
  }

  .card h3 {
    font-size: 12px;
  }

  .name {
    font-size: 10px;
  }

  .address {
    font-size: 9px;
  }

  .pickup-box {
    font-size: 8px;
    padding: 4px;
  }

  .product h4 {
    font-size: 10px;
  }

  .price .new {
    font-size: 10px;
  }

  .total-price {
    font-size: 10px;
  }

  .pay-btn {
    font-size: 9px;
    padding: 6px;
  }

  .promo input {
    padding: 4px;
    font-size: 9px;
  }

  .promo button {
    padding: 4px 8px;
    font-size: 9px;
  }

  .row,
  .total {
    margin: 4px 0;
  }

  .product {
    gap: 6px;
  }

  .product img {
    width: 40px;
  }

  .delivery-box {
    padding: 6px;
    gap: 6px;
  }

  .radio {
    width: 12px;
    height: 12px;
  }

  .form-group input,
  .form-group textarea {
    padding: 4px;
    font-size: 9px;
  }

  .save-btn,
  .cancel-btn {
    padding: 4px 8px;
    font-size: 9px;
  }
}
</style>
