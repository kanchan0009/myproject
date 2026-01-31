<template>
  <router-view />
  <ToastNotification
    ref="toastRef"
    :message="toastMessage"
    :type="toastType"
    :duration="3000"
  />
</template>

<script>
import { provide, ref, onMounted, watch} from "vue";
import api from "@/api/axios";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  components: {
    ToastNotification,
  },
  setup() {
    const isAuthenticated = ref(false);
    const toastMessage = ref("");
    const toastType = ref("success");
    const toastRef = ref(null);

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

    // Cart state management
    const cartItems = ref([]);
    let showToast = (message, type = "info") => {
      toastMessage.value = message;
      toastType.value = type;
      if (toastRef.value) {
        toastRef.value.show();
      }
    };

    // Load cart items from localStorage
    const loadCartFromStorage = () => {
      try {
        const stored = localStorage.getItem("cartItems");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            cartItems.value = parsed;
          }
        }
      } catch (e) {
        console.error("Error loading cart from localStorage:", e);
        cartItems.value = [];
      }
    };

    // Save cart items to localStorage
    const saveCartToStorage = () => {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
      } catch (e) {
        console.error("Error saving cart to localStorage:", e);
      }
    };

    // Watch for changes and save to localStorage
    watch(cartItems, saveCartToStorage, { deep: true });

    // Wishlist state management
    const wishlistItems = ref([]);

    const addToWishlist = (product) => {
      const existingItem = wishlistItems.value.find(
        (item) => item.id === product.id,
      );
      if (!existingItem) {
        wishlistItems.value.push({
          ...product,
        });
      }
      showToast("Product added to wishlist", "success");
    };

    const removeFromWishlist = (productId) => {
      wishlistItems.value = wishlistItems.value.filter(
        (item) => item.id !== productId,
      );
      showToast("Product removed from wishlist", "info");
    };

    const addToCart = (product) => {
      const existingItem = cartItems.value.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.value.push({
          ...product,
          quantity: 1,
          selected:true,
          price:product.price,
        });
      }

      // Remove from wishlist if it exists there
      const wishlistItemIndex = wishlistItems.value.findIndex(
        (item) => item.id === product.id,
      );
      if (wishlistItemIndex !== -1) {
        wishlistItems.value.splice(wishlistItemIndex, 1);
      }

      const totalItems = cartItems.value.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      showToast(`Product added to cart (${totalItems} items)`, "success");
    };

    const removeFromCart = (productId) => {
      cartItems.value = cartItems.value.filter((item) => item.id !== productId);
      showToast("Product removed from cart", "info");
    };

    const updateQuantity = (productId, quantity) => {
      const item = cartItems.value.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          removeFromCart(productId);
        }
      }
    };

    const clearCart = () => {
      cartItems.value = [];
    };

    onMounted(() => {
      checkAuth();
      loadCartFromStorage();
    });

    provide("auth", {
      isAuthenticated,
      login,
      logout,
    });

    provide("cartState", {
      items: cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setToastFunction: (fn) => {
        showToast = fn;
      },
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
