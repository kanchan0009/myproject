<template>
  <div v-if="isVisible" class="toast-notification" :class="type">
    <div class="toast-content">
      <i :class="iconClass"></i>
      <span>{{ internalMessage }}</span>
    </div>
    <button @click="close">&times;</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: { type: String, default: "success" },
    duration: { type: Number, default: 3000 },
    cartItems: { type: Array, default: () => [] },
  },
  data() {
    return { isVisible: false, timeoutId: null, internalMessage: "" };
  },
  computed: {
    iconClass() {
      return {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-triangle",
      }[this.type] || "fas fa-info-circle";
    },
  },
  methods: {
    show() {
      if (!this.message) return;
      this.internalMessage = this.message;
      this.isVisible = true;
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.close, this.duration);
    },
    close() {
      this.isVisible = false;
      this.internalMessage = "";
      if (this.timeoutId) clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.$emit("close");
    },
  },
  beforeUnmount() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  },
};
</script>





<style scoped>
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  min-width: 300px;
  max-width: 500px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Arial, sans-serif;
  animation: slideIn 0.3s ease-out;
}

.toast-notification.success {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border-left: 4px solid #2e7d32;
}

.toast-notification.error {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  border-left: 4px solid #b71c1c;
}

.toast-notification.info {
  background: linear-gradient(135deg, #2196f3, #1976d2);
  color: white;
  border-left: 4px solid #0d47a1;
}

.toast-notification.warning {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  border-left: 4px solid #e65100;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.toast-content i {
  font-size: 18px;
}

.toast-content span {
  font-size: 14px;
  font-weight: 500;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Mobile Responsiveness */
@media (max-width: 480px) {
  .toast-notification {
    left: 10px;
    right: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>
