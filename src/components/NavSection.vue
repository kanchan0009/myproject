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
        <img :src="require('@/assets/img.png')" alt="Logo" />
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

    <div class="cart-icon" @click="toggleCart">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="cartItemCount > 0" class="cart-count">{{
        cartItemCount
      }}</span>
    </div>
  </header>

  <!-- Navbar -->
  <nav class="navbar">
    <div class="nav-container">
      <ul :class="['nav-menu', { active: isMobileMenuOpen }]">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
          >
            Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/categories"
            class="nav-link"
            :class="{ active: $route.path.includes('/categories') }"
          >
            Categories
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/products"
            class="nav-link"
            :class="{ active: $route.path.includes('/products') }"
          >
            Products
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            :class="{ active: $route.path === '/about' }"
          >
            About Us
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/contact"
            class="nav-link"
            :class="{ active: $route.path === '/contact' }"
          >
            Contact
          </router-link>
        </li>
      </ul>

      <!-- Hamburger Button -->
      <button class="mobile-toggle" @click="toggleMobileMenu">
        <span class="hamburger"></span>
      </button>
    </div>
  </nav>

  <!-- Cart Modal -->
  <CartModal
    :is-open="isCartOpen"
    :cart-items="cartItems"
    @close="closeCart"
    @update-cart="updateCart"
  />

  <!-- Toast Notification -->
  <ToastNotification
    ref="toastRef"
    :message="toastMessage"
    :type="toastType"
    :duration="3000"
  />
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import CartModal from "@/components/CartModal.vue";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  name: "Navbar",
  components: {
    CartModal,
    ToastNotification,
  },
  setup() {
    const router = useRouter();
    const isMobileMenuOpen = ref(false);
    const showCategoriesDesktop = ref(false);
    const showCategoriesMobile = ref(false);
    const isCartOpen = ref(false);
    const cartItems = ref([]);
    const toastMessage = ref("");
    const toastType = ref("success");
    const searchQuery = ref("");
    const toastRef = ref(null);
    const showSuggestions = ref(false);
    const filteredSuggestions = ref([]);
    const products = require("@/data/products.json");

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleCategoriesMobile = () => {
      if (window.innerWidth <= 768) {
        showCategoriesMobile.value = !showCategoriesMobile.value;
      }
    };

    const toggleCart = () => {
      isCartOpen.value = !isCartOpen.value;
    };

    const closeCart = () => {
      isCartOpen.value = false;
    };

    const updateCart = (newItems) => {
      cartItems.value = newItems;
    };

    const cartItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
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
          .filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.brand.toLowerCase().includes(query) ||
              product.type.toLowerCase().includes(query),
          )
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

        // Import products data
        const products = require("@/data/products.json");

        // Check for exact match (product name)
        const exactMatch = products.find(
          (product) => product.name.toLowerCase() === query,
        );

        if (exactMatch) {
          // Navigate to product detail page
          router.push(`/productdetail/${exactMatch.id}`);
          return;
        }

        // Check for alternatives (partial matches in name, brand, type, or description)
        const alternatives = products.filter(
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
      const existingItemIndex = cartItems.value.findIndex(
        (item) => item.id === product.id,
      );

      if (existingItemIndex > -1) {
        cartItems.value[existingItemIndex].quantity += quantity;
      } else {
        cartItems.value.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images
            ? product.images[0]
            : require("@/assets/medical.jpeg"),
          quantity: quantity,
        });
      }
    };

    return {
      isMobileMenuOpen,
      showCategoriesDesktop,
      showCategoriesMobile,
      isCartOpen,
      cartItems,
      toastMessage,
      toastType,
      searchQuery,
      showSuggestions,
      filteredSuggestions,
      toggleMobileMenu,
      toggleCategoriesMobile,
      toggleCart,
      closeCart,
      updateCart,
      cartItemCount,
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
    #7ed9b0 100%
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
  gap: 10px; /* space between logo and text */
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

/* Cart Icon */
.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-icon i {
  font-size: 1.5em;
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

/* Hamburger */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
.hamburger {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  position: relative;
  transition: all 0.3s;
}
.hamburger::before,
.hamburger::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: all 0.3s;
}
.hamburger::before {
  top: -8px;
}
.hamburger::after {
  bottom: -8px;
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
    width: 80px;
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
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: white;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
  }

  .nav-menu.active {
    transform: translateY(0);
  }

  .nav-item {
    border-bottom: 1px solid #f0f0f0;
  }

  .nav-link {
    padding: 15px 20px;
    width: 100%;
    display: block;
    font-size: 15px;
  }

  .mobile-toggle {
    display: block;
  }

  .hamburger {
    width: 22px;
    height: 2px;
  }

  .hamburger::before {
    top: -6px;
  }

  .hamburger::after {
    bottom: -6px;
  }
}

@media (max-width: 480px) {
  .top-bar {
    padding: 10px 3%;
    font-size: 13px;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .top-link {
    font-size: 13px;
  }

  .main-header {
    padding: 6px 3%;
    height: 55px;
    flex-direction: column;
    gap: 8px;
  }

  .logo-section {
    gap: 8px;
  }

  .logo-icon {
    width: 70px;
    height: 50px;
  }

  .logo-text {
    font-size: 1em;
  }

  .search-container {
    margin: 0;
    max-width: none;
    order: 3;
    width: 100%;
  }

  .search-form {
    margin: 0;
  }

  .search-form input {
    padding: 10px 12px;
    font-size: 14px;
  }

  .search-form button {
    padding: 10px 12px;
  }

  .suggestions-dropdown {
    max-height: 200px;
  }

  .suggestion-item {
    padding: 8px 10px;
    font-size: 12px;
  }

  .cart-icon {
    order: 2;
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
    height: 45px;
  }

  .nav-menu {
    top: 55px;
  }

  .nav-link {
    padding: 12px 15px;
    font-size: 14px;
  }

  .hamburger {
    width: 20px;
    height: 2px;
  }

  .hamburger::before {
    top: -5px;
  }

  .hamburger::after {
    bottom: -5px;
  }
}
</style>
