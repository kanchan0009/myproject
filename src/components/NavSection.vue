<template>
  <!-- Top Announcement Bar -->
  <div class="top-bar">
    <span>Professional Physiotherapy Equipment</span>
    <a
      class="top-link"
      href="https://www.daraz.com.np"
      target="_blank"
      rel="noopener"
    >
      Visit us on Daraz.np
    </a>
  </div>

  <!-- Header with Logo and Search -->
  <header class="main-header">
    <div class="logo-section">
      <div class="logo-icon">
        <img :src="require('@/assets/logoimg physio.jpeg')" alt="Logo" />
      </div>
      <span class="logo-text">PhysioNepal</span>
    </div>

    <div class="search-container">
      <form class="search-form" @submit.prevent="handleSearch">
        <input
          type="text"
          placeholder="Search products..."
          v-model="searchQuery"
          ref="searchInput"
          @keyup.enter="handleSearch"
          @input="updateSuggestions"
          @focus="showSuggestions = true"
          @blur="hideSuggestions"
        />
        <button type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>

      <!-- Search Suggestions Dropdown -->
      <div
        v-if="showSuggestions && filteredSuggestions.length > 0"
        class="suggestions-dropdown"
      >
        <div
          v-for="product in filteredSuggestions"
          :key="product.id"
          class="suggestion-item"
          @mousedown="selectSuggestion(product)"
        >
          {{ product.name }}
        </div>
      </div>
    </div>

    <div class="wishlist-icon" @click="goToWishlist">
      <i class="fas fa-heart"></i>
      <span v-if="wishlistItemCount > 0" class="wishlist-count">{{
        wishlistItemCount
      }}</span>
    </div>

    <div class="cart-icon" @click="goToCart">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="cartItemCount > 0" class="cart-count">{{
        cartItemCount
      }}</span>
    </div>

    <div class="login-icon" @click="goToLogin">
      <i class="fas fa-user"></i>
    </div>
  </header>

  <!-- Navbar -->
  <nav class="navbar">
    <div class="nav-container">
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
          >
            <i class="fas fa-home nav-icon"></i>
            <span class="nav-text">Home</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/categories"
            class="nav-link"
            :class="{ active: $route.path.includes('/categories') }"
          >
            <i class="fas fa-th-large nav-icon"></i>
            <span class="nav-text">Categories</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link"
            :class="{ active: $route.path.includes('/products') }"
          >
            <i class="fas fa-box nav-icon"></i>
            <span class="nav-text">Products</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            :class="{ active: $route.path === '/about' }"
          >
            <i class="fas fa-info-circle nav-icon"></i>
            <span class="nav-text">About Us</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/contact"
            class="nav-link"
            :class="{ active: $route.path === '/contact' }"
          >
            <i class="fas fa-envelope nav-icon"></i>
            <span class="nav-text">Contact</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Toast Notification -->
  <ToastNotification
    ref="toastRef"
    :message="toastMessage"
    :type="toastType"
    :duration="3000"
  />
</template>

<script>
import { ref, computed, inject, defineExpose } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  name: "Navbar",
  components: {
    ToastNotification,
  },
  setup() {
    const cartState = inject("cartState");
    const wishlistState = inject("wishlistState");
    const router = useRouter();
    const showCategoriesDesktop = ref(false);
    const showCategoriesMobile = ref(false);
    const isMobileMenuOpen = ref(false);
    const toastMessage = ref("");
    const toastType = ref("success");
    const searchQuery = ref("");
    const toastRef = ref(null);
    const showSuggestions = ref(false);
    const filteredSuggestions = ref([]);
    const products = ref([]);

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleCategoriesMobile = () => {
      if (window.innerWidth <= 768) {
        showCategoriesMobile.value = !showCategoriesMobile.value;
      }
    };

    const goToCart = () => {
      router.push("/cart");
    };

    const goToWishlist = () => {
      router.push("/wishlist");
    };

    const goToLogin = () => {
      router.push("/login");
    };

    const cartItemCount = computed(() => {
      return cartState.items.reduce((total, item) => total + item.quantity, 0);
    });

    const wishlistItemCount = computed(() => {
      return wishlistState.items.length;
    });

    // Show toast notification
    const showToast = (message, type = "success") => {
      toastMessage.value = message;
      toastType.value = type;
      if (toastRef.value) {
        toastRef.value.show();
      }
    };

    // Update search suggestions
    const updateSuggestions = () => {
      const query = searchQuery.value.trim().toLowerCase();
      if (query.length > 0) {
        filteredSuggestions.value = products
          .filter((product) => product.name.toLowerCase().startsWith(query))
          .slice(0, 8); // Limit to 8 suggestions
      } else {
        filteredSuggestions.value = [];
      }
    };

    // Hide suggestions
    const hideSuggestions = () => {
      // Delay hiding to allow click events on suggestions
      setTimeout(() => {
        showSuggestions.value = false;
      }, 150);
    };

    // Select a suggestion
    const selectSuggestion = (product) => {
      searchQuery.value = product.name;
      showSuggestions.value = false;
      router.push(`/productdetail/${product.id}`);
    };

    // Handle search functionality
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.trim().toLowerCase();

        // Use fetched products data from API
        const productsData = products.value;

        // Check for exact match (product name)
        const exactMatch = productsData.find(
          (product) => product.name.toLowerCase() === query,
        );

        if (exactMatch) {
          // Navigate to product detail page
          router.push(`/productdetail/${exactMatch.id}`);
          return;
        }

        // Check for alternatives (partial matches in name, brand, type, or description)
        const alternatives = productsData.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            (product.description &&
              product.description.toLowerCase().includes(query)),
        );

        if (alternatives.length > 0) {
          // Navigate to products page with search query to show alternatives
          router.push({
            path: "/products",
            query: { search: query },
          });
        } else {
          // No products found, show out of stock message
          showToast("Product out of stock or not available", "error");
        }
      }
    };

    // Add to cart method (can be called from other components)
    const addToCart = (product, quantity = 1) => {
      cartState.addToCart(product, quantity);
    };

    // Fetch products for search
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        products.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        products.value = []; // Set empty array on error
      }
    };

    // Fetch products on mount
    fetchProducts();

    // Set the toast function in cartState
    cartState.setToastFunction(showToast);

    // Expose methods to parent
    defineExpose({
      addToCart,
      showToast,
    });

    return {
      isMobileMenuOpen,
      showCategoriesDesktop,
      showCategoriesMobile,
      cartItems: cartState.items,
      toastMessage,
      toastType,
      searchQuery,
      showSuggestions,
      filteredSuggestions,
      toggleCategoriesMobile,
      goToCart,
      goToWishlist,
      goToLogin,
      cartItemCount,
      wishlistItemCount,
      showToast,
      updateSuggestions,
      hideSuggestions,
      selectSuggestion,
      handleSearch,
      addToCart,
    };
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* Top Bar */
.top-bar {
  background: linear-gradient(
    120deg,
    #6fc6f5 0%,
    #6fc6f5 45%,
    #7ed9b0 55%,
    #086239 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  color: white;
  font-weight: bold;
}

.top-link {
  color: white;
  text-decoration: none;
}
.top-link:hover {
  text-decoration: underline;
}

/* Header */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  height: 70px;
}

.logo-section {
  display: flex;
  align-items: center; /* vertically center icon and text */
  gap: 5px; /* space between logo and text */
}

.logo-icon {
  width: 100px; /* fixed width */
  height: 65px; /* fixed height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* hide overflow if image is too big */
  border-radius: 12px; /* rounded corners */
  background-color: #fff; /* optional background */
}

.logo-icon img {
  width: 100%; /* fill container width */
  height: 100%; /* fill container height */
  object-fit: contain; /* keep aspect ratio */
}
.logo-text {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

/* Search Container */
.search-container {
  position: relative;
  max-width: 600px;
  flex-grow: 1;
  margin: 0 50px;
}

/* Search Form */
.search-form {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
}
.search-form input {
  padding: 10px 15px;
  border: none;
  flex-grow: 1;
  outline: none;
}
.search-form button {
  background-color: #f1f1f1;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}
.search-form button i {
  color: #888;
}

/* Search Suggestions Dropdown */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 9999;
  margin-top: 2px;
}

.suggestion-item {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  font-size: 14px;
  color: #333;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.suggestion-item:last-child {
  border-bottom: none;
}

/* Wishlist Icon */
.wishlist-icon {
  position: relative;
  cursor: pointer;

}

.wishlist-icon i {
  font-size: 1.2em;
  color: #333;
  transition: color 0.3s ease;
}

.wishlist-icon:hover i {
  color: #e91e63;
}

.wishlist-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e91e63;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid white;
}

/* Cart Icon */
.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-icon i {
  font-size: 1.2em;
  color: #333;
  transition: color 0.3s ease;
}

.cart-icon:hover i {
  color: #6fc6f5;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid white;
}

/* Login Icon */
.login-icon {
  position: relative;
  cursor: pointer;
}

.login-icon i {
  font-size: 1.2em;
  color: #333;
  transition: color 0.3s ease;
}

.login-icon:hover i {
  color: #6fc6f5;
}

/* Navbar */
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: 300;
  padding: 4px 0;
  position: relative;
  transition: color 0.3s ease;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.nav-link:hover {
  color: #2c3e50;
}
.nav-link.active {
  color: #2c3e50;
  font-weight: 600;
}
.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: grey;
}

.nav-text {
  font-size: 16px;
  margin-top: 2px;
}

.nav-icon {
  display: none;
}

/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .top-bar {
    padding: 12px 4%;
    font-size: 14px;
  }

  .top-link {
    font-size: 14px;
  }

  .main-header {
    padding: 8px 4%;
    height: 60px;
  }

  .logo-icon {
    width: 60px;
    height: 55px;
  }

  .logo-text {
    font-size: 1.1em;
  }

  .search-container {
    margin: 0 8px;
    max-width: 400px;
  }

  .search-form {
    margin: 0;
  }

  .search-form input {
    padding: 8px 12px;
  }

  .search-form button {
    padding: 8px 12px;
  }

  .suggestions-dropdown {
    max-height: 250px;
  }

  .suggestion-item {
    padding: 10px 12px;
    font-size: 13px;
  }

  .cart-icon i {
    font-size: 1.3em;
  }

  .nav-container {
    padding: 0 15px;
    height: 50px;
  }

  .nav-menu {
    gap: 15px;
  }

  .nav-link {
    font-size: 14px;
  }

  .nav-link i {
    font-size: 18px;
  }

  .nav-text {
    font-size: 10px;
  }

  .nav-icon {
    display: inline-block;
  }
}

@media (max-width: 480px) {
  .top-bar {
    padding: 8px 3%;
    font-size: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }

  .top-link {
    font-size: 12px;
  }

  .main-header {
    padding: 6px 3%;
    height: 55px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .logo-section {
    gap: 2px;
  }

  .logo-icon {
    width: 40px;
    height: 45px;
  }

  .logo-text {
    font-size: 0.9em;
  }

  .search-container {
    margin: 0 10px;
    flex: 1;
    min-width: 150px;
  }

  .search-form {
    margin: 0;
  }

  .search-form input {
    padding: 8px 10px;
    font-size: 13px;
  }

  .search-form button {
    padding: 8px 10px;
  }

  .suggestions-dropdown {
    max-height: 200px;
  }

  .suggestion-item {
    padding: 8px 10px;
    font-size: 12px;
  }

  .cart-icon i {
    font-size: 1.2em;
  }

  .cart-count {
    width: 18px;
    height: 18px;
    font-size: 11px;
    top: -6px;
    right: -6px;
  }

  .nav-container {
    padding: 0 10px;
    height: 65px;
  }

  .nav-menu {
    gap: 5px;
    justify-content: space-between;
  }

  .nav-link {
    padding: 6px 0;
    font-size: 11px;
  }

  .nav-link i {
    font-size: 16px;
    color: #55c894;
  }
  .nav-text:hover {
    color: #55c894;
  }

  .nav-text {
    font-size: 12px;
  }

  .mobile-toggle {
    display: none;
  }
}
</style>
