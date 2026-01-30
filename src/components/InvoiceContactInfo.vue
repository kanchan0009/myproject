<template>
  <div class="invoice-container">
    <h2>Invoice and Contact Info</h2>

    <!-- Email -->
    <div class="form-group">
      <label><span>*</span> Email</label>
      <input type="email" v-model="email" placeholder="Enter your email" />
      <small>Enter your email to get delivery status updates</small>
    </div>

    <!-- Billing Address -->
    <div class="form-group">
      <div class="address-header">
        <label><span>*</span> Billing Address</label>
        <a href="#" @click.prevent="editBillingAddress" v-if="!isEditing"
          >EDIT</a
        >
      </div>

      <div v-if="!isEditing">
        <textarea
          v-model="billingAddress"
          rows="4"
          readonly
          placeholder="Please edit your billing address"
        ></textarea>
        <small>Please edit your billing address</small>
      </div>

      <div v-else class="edit-form">
        <textarea
          v-model="editBillingAddress"
          rows="4"
          placeholder="Enter your billing address"
        ></textarea>
        <small>Enter your complete billing address</small>

        <!-- Edit Actions -->
        <div class="edit-actions">
          <button class="cancel-edit-btn" @click="cancelEdit">CANCEL</button>
          <button class="save-edit-btn" @click="saveBillingAddress">
            SAVE
          </button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="actions" v-if="!isEditing">
      <button class="cancel-btn" @click="cancel">CANCEL</button>
      <button class="save-btn" @click="save">SAVE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceContactInfo",
  props: {
    initialEmail: {
      type: String,
      default: "",
    },
    initialBillingAddress: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      email: this.initialEmail,
      billingAddress: this.initialBillingAddress,
      isEditing: false,
      editBillingAddress: "",
    };
  },
  watch: {
    initialEmail(newVal) {
      this.email = newVal;
    },
    initialBillingAddress(newVal) {
      this.billingAddress = newVal;
    },
  },
  methods: {
    editBillingAddress() {
      this.isEditing = true;
      this.editBillingAddress = this.billingAddress;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editBillingAddress = "";
    },
    saveBillingAddress() {
      this.billingAddress = this.editBillingAddress;
      this.isEditing = false;
      this.editBillingAddress = "";
      this.$emit("update:billingAddress", this.billingAddress);
    },
    cancel() {
      console.log("Cancelled");
      this.$emit("close");
    },
    save() {
      console.log("Saved", this.email, this.billingAddress);
      this.$emit("update:email", this.email);
      this.$emit("update:billingAddress", this.billingAddress);
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.invoice-container {
  max-width: 520px;
  background: #fff;
  padding: 30px;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 25px;
  font-size: 22px;
}

/* Form */
.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
}

label span {
 color:rgb(28, 164, 28);
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
  border-radius: 2px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #1aa3b8;
}

small {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #888;
}

/* Address header */
.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-header a {
  font-size: 14px;
  color: #1aa3b8;
  text-decoration: none;
}

.address-header a:hover {
  text-decoration: underline;
}

/* Actions */
.actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.cancel-btn {
  flex: 1;
  padding: 12px;
  border: none;
  background: #f2f3f5;
  color: #666;
  font-size: 15px;
  cursor: pointer;
}

.save-btn {
  flex: 1;
  padding: 12px;
  border: none;
  background: #1aa3b8;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.save-btn:hover {
  background: #086239;
}

/* Edit form */
.edit-form {
  margin-top: 15px;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.cancel-edit-btn {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}

.save-edit-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: #1aa3b8;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
}

.save-edit-btn:hover {
  background: #168da0;
}
</style>
