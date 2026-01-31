<template>
  <div class="shipping-detail-page">
    <div class="container">
      <div class="header">
        <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>Shipping Details</h2>
      </div>

      <form @submit.prevent="saveShippingDetails" class="shipping-form">
        <!-- Contact Information -->
        <div class="form-section">
          <h3>Contact Information</h3>
          <div class="form-group">
            <label for="fullName">Full Name *</label>
            <input
              id="fullName"
              v-model="shippingDetails.shipping_full_name"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input
              id="phone"
              v-model="shippingDetails.shipping_phone"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="form-section">
          <h3>Shipping Address</h3>
          <div class="form-group">
            <label for="address">Address *</label>
            <textarea
              id="address"
              v-model="shippingDetails.shipping_address"
              placeholder="Enter your complete address"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City *</label>
              <input
                id="city"
                v-model="shippingDetails.shipping_city"
                type="text"
                placeholder="Enter city"
                required
              />
            </div>

            <div class="form-group">
              <label for="state">State/Province *</label>
              <input
                id="state"
                v-model="shippingDetails.shipping_state"
                type="text"
                placeholder="Enter state/province"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="postalCode">Postal Code *</label>
            <input
              id="postalCode"
              v-model="shippingDetails.shipping_postal_code"
              type="text"
              placeholder="Enter postal code"
              required
            />
          </div>
        </div>

        <!-- Additional Info -->
        <div class="form-section">
          <h3>Additional Information</h3>
          <div class="form-group">
            <label for="notes">Delivery Notes (Optional)</label>
            <textarea
              id="notes"
              v-model="shippingDetails.notes"
              placeholder="Any special delivery instructions..."
              rows="2"
            ></textarea>
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="goBack">
            Cancel
          </button>
          <button type="submit" class="save-btn">Save Shipping Details</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ShippingDetail",
  setup() {
    const router = useRouter();
    const cartState = inject("cartState");

    // Reactive shipping detail state
    const shippingDetails = ref({
      shipping_full_name: "",
      shipping_phone: "",
      shipping_address: "",
      shipping_city: "",
      shipping_state: "",
      shipping_postal_code: "",
      notes: "",
      tag: "Home", // Optional: Home/Office/etc.
    });

    // Computed property for display formatting
    const displayAddress = ref({
      name: "",
      phone: "",
      tag: "",
      fullAddress: "",
    });

    // Load and format shipping details
    const loadShippingDetails = () => {
      const saved = localStorage.getItem("shippingDetails");
      if (saved) {
        shippingDetails.value = { ...shippingDetails.value, ...JSON.parse(saved) };
      }
      displayAddress.value = {
        name: shippingDetails.value.shipping_full_name,
        phone: shippingDetails.value.shipping_phone,
        tag: shippingDetails.value.tag || "Home",
        fullAddress: `${shippingDetails.value.shipping_address}, ${shippingDetails.value.shipping_city}, ${shippingDetails.value.shipping_state} - ${shippingDetails.value.shipping_postal_code}`,
      };
    };

    // Validation before saving
    const validateFields = () => {
      const requiredFields = [
        "shipping_full_name",
        "shipping_phone",
        "shipping_address",
        "shipping_city",
        "shipping_state",
        "shipping_postal_code",
      ];

      for (const field of requiredFields) {
        if (!shippingDetails.value[field].trim()) {
          alert(
            `${field.replace("shipping_", "").replace("_", " ")} is required`
          );
          return false;
        }
      }
      return true;
    };

    // Save shipping details to localStorage
    const saveShippingDetails = () => {
      if (!validateFields()) return;

      if (!cartState || !cartState.items.value.length) {
        alert("Your cart is empty. Add items before checkout.");
        return;
      }

      localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails.value));

      // Update display address after saving
      displayAddress.value = {
        name: shippingDetails.value.shipping_full_name,
        phone: shippingDetails.value.shipping_phone,
        tag: shippingDetails.value.tag || "Home",
        fullAddress: `${shippingDetails.value.shipping_address}, ${shippingDetails.value.shipping_city}, ${shippingDetails.value.shipping_state} - ${shippingDetails.value.shipping_postal_code}`,
      };

      alert("Shipping details saved successfully! You can now proceed to payment.");
      router.push("/checkout");
    };

    const goBack = () => router.go(-1);

    onMounted(() => {
      loadShippingDetails();
    });

    return {
      shippingDetails,
      displayAddress,
      saveShippingDetails,
      goBack,
    };
  },
};
</script>

<style scoped>
.shipping-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 0;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  margin-right: 15px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #f5f5f5;
}

.header h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.shipping-form {
  padding: 20px;
}

.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #333;
  border-bottom: 2px solid #6fc6f5;
  padding-bottom: 8px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6fc6f5;
  box-shadow: 0 0 0 2px rgba(111, 198, 245, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.cancel-btn,
.save-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background: #e9e9e9;
}

.save-btn {
  background: #6fc6f5;
  color: white;
}

.save-btn:hover {
  background: #5bb8e5;
}

/* Responsive */
@media (max-width: 768px) {
  .shipping-detail-page {
    padding: 10px 0;
  }

  .container {
    margin: 0 10px;
    border-radius: 6px;
  }

  .header {
    padding: 15px;
  }

  .header h2 {
    font-size: 20px;
  }

  .shipping-form {
    padding: 15px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .cancel-btn,
  .save-btn {
    width: 100%;
    padding: 14px;
  }
}

@media (max-width: 480px) {
  .header h2 {
    font-size: 18px;
  }

  .form-section h3 {
    font-size: 16px;
  }

  .form-group input,
  .form-group textarea {
    padding: 10px;
    font-size: 14px;
  }

  .cancel-btn,
  .save-btn {
    font-size: 14px;
    padding: 12px;
  }
}
</style>
