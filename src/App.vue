<template>
  <router-view />
  <ToastNotification
    ref="toastRef"
    :message="toastMessage"
    :type="toastType"
    :cart-items="cartItems"
    :duration="3000"
  />
</template>

<script>
import { provide, ref, onMounted, watch } from "vue";
import api from "@/api/axios";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  name: "App",
  components: { ToastNotification },

  setup() {
    // --- AUTH ---
    const isAuthenticated = ref(false);
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
      }
    };
    const login = (token) => {
      localStorage.setItem("authToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      isAuthenticated.value = true;
    };
    const logout = () => {
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
      isAuthenticated.value = false;
    };

    // --- TOAST ---
    const toastMessage = ref("");
    const toastType = ref("success");
    const toastRef = ref(null);

    const showToast = (message, type = "info") => {
      toastMessage.value = message;
      toastType.value = type;
      toastRef.value?.show();
    };

    // --- CART ---
    const cartItems = ref([]);
    const loadCartFromStorage = () => {
      try {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) cartItems.value = parsed;
        }
      } catch (e) {
        console.error("Error loading cart from storage:", e);
      }
    };
    const saveCartToStorage = () => {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
      } catch (e) {
        console.error("Error saving cart to storage:", e);
      }
    };
    watch(cartItems, saveCartToStorage, { deep: true });

    const addToCart = (product) => {
      const existing = cartItems.value.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.value.push({ ...product, quantity: 1, selected: true });
      }
      showToast("Product added to cart", "success");
    };

    const removeFromCart = (productId) => {
      cartItems.value = cartItems.value.filter((i) => i.id !== productId);
      showToast("Product removed from cart", "info");
    };

    const updateQuantity = (productId, quantity) => {
      const item = cartItems.value.find((i) => i.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) removeFromCart(productId);
      }
    };

    const clearCart = () => {
      cartItems.value = [];
    };

    // --- WISHLIST ---

    const wishlistItems = ref([]);

    const addToWishlist = (prod) => {
      if (!wishlistItems.value.some((i) => i.id === prod.id)) {
        wishlistItems.value.push({
          id: prod.id,
          name: prod.name,
          price: prod.final_price || prod.price,
          image: prod.primary_image || "/assets/medical.jpeg",
        });
      }
      showToast("Product added to wishlist", "success");
    };

    const removeFromWishlist = (productId) => {
      wishlistItems.value = wishlistItems.value.filter(
        (i) => i.id !== productId,
      );
      showToast("Product removed from wishlist", "info");
    };

    // --- Demo Login / Load ---
    const loginDemo = () => {
      const demoToken = "demo-token";
      login(demoToken);
      showToast("Demo login successful", "success");
    };

    onMounted(() => {
      checkAuth();
      loadCartFromStorage();
    });

    // --- PROVIDE STATES ---
    provide("auth", { isAuthenticated, login, logout });
    provide("cartState", {
      items: cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      showToast,
    });
    provide("wishlistState", {
      items: wishlistItems,
      addToWishlist,
      removeFromWishlist,
    });

    return {
      isAuthenticated,
      toastMessage,
      toastType,
      toastRef,
      loginDemo,
      logout,
      cartItems,
      wishlistItems,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  color: #000;
  overflow-x: hidden;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
a:hover {
  text-decoration: underline;
  color: #42b983;
}
</style>
