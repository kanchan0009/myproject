import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App).use(router);

// Global cart state
const cartState = reactive({
  items: [],
  loading: true,
  error: null,
  addToCart(product, quantity = 1) {
    const existingItemIndex = cartState.items.findIndex(
      (item) => item.id === product.id,
    );
    if (existingItemIndex > -1) {
      cartState.items[existingItemIndex].quantity += quantity;
    } else {
      cartState.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images ? product.images[0] : "/assets/medical.jpeg",
        quantity: quantity,
      });
    }
  },
  showToast(message, type = "success") {
    // This will be set by the navbar component
    if (cartState.toastFunction) {
      cartState.toastFunction(message, type);
    }
  },
  setToastFunction(func) {
    cartState.toastFunction = func;
  },
  async fetchCart() {
    // Start with an empty cart
    cartState.items = [];
    cartState.loading = false;
    cartState.error = null;
  },
});

// Global wishlist state
const wishlistState = reactive({
  items: [],
  loading: true,
  error: null,
  addToWishlist(product) {
    const existingItemIndex = wishlistState.items.findIndex(
      (item) => item.id === product.id,
    );
    if (existingItemIndex === -1) {
      wishlistState.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images ? product.images[0] : "/assets/medical.jpeg",
      });
    }
  },
  removeFromWishlist(productId) {
    const index = wishlistState.items.findIndex(
      (item) => item.id === productId,
    );
    if (index > -1) {
      wishlistState.items.splice(index, 1);
    }
  },
  async fetchWishlist() {
    try {
      wishlistState.loading = true;
      const response = await axios.get("http://127.0.0.1:8000/api/wishlist/");
      wishlistState.items = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      }));
      wishlistState.error = null;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      wishlistState.error = "Failed to load wishlist";
      // Initialize empty wishlist if API fails
      wishlistState.items = [];
    } finally {
      wishlistState.loading = false;
    }
  },
});

// Fetch cart and wishlist on app initialization
cartState.fetchCart();
wishlistState.fetchWishlist();

// Provide global states
app.provide("cartState", cartState);
app.provide("wishlistState", wishlistState);

app.mount("#app");
