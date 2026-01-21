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
      <div class="logo-icon"><img :src="require('@/assets/img.png')" alt="Logo" /></div>
      <span class="logo-text">PhysioNepal</span>
    </div>

    <form class="search-form">
      <input type="text" placeholder="Search products..." />
      <button type="submit">
        <i class="fas fa-search"></i>
      </button>
    </form>

    <div class="cart-icon">
      <i class="fas fa-shopping-cart"></i>
    </div>
  </header>

  <!-- Navbar -->
  <nav class="navbar">
    <div class="nav-container">
      <ul :class="['nav-menu', { active: isMobileMenuOpen }]">
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
          <div
            class="nav-item-wrapper"
            @mouseenter="showCategoriesDesktop = true"
            @mouseleave="showCategoriesDesktop = false"
            @click="toggleCategoriesMobile"
          >
            <router-link
              to="/products"
              class="nav-link"
              :class="{ active: $route.path.includes('/products') }"
            >
              Products
            </router-link>

            <transition name="fade">
              <div
                v-if="showCategoriesDesktop || showCategoriesMobile"
                class="category-dropdown-container"
              >
                <div class="category-list">
                  <div
                    v-for="category in categories"
                    :key="category.id"
                    class="category-item"
                  >
                    {{ category.name }}
                  </div>
                </div>
              </div>
            </transition>
          </div>
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
</template>

<script>
import { ref } from "vue";

export default {
  name: "Navbar",
  setup() {
    const isMobileMenuOpen = ref(false);
    const showCategoriesDesktop = ref(false);
    const showCategoriesMobile = ref(false);

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const toggleCategoriesMobile = () => {
      if (window.innerWidth <= 768) {
        showCategoriesMobile.value = !showCategoriesMobile.value;
      }
    };

    return {
      isMobileMenuOpen,
      showCategoriesDesktop,
      showCategoriesMobile,
      toggleMobileMenu,
      toggleCategoriesMobile,
    };
  },
  data() {
    return {
      categories: [
        { id: 1, name: "Traction Systems" },
        { id: 2, name: "TENS/EMS Units" },
        { id: 3, name: "Ultrasound Therapy" },
        { id: 4, name: "Infra-Red Therapy" },
        { id: 5, name: "Rehabilitation" },
        { id: 6, name: "Sports Recovery" },
        { id: 7, name: "Orthopedic Care" },
        { id: 8, name: "Diagnostic Tools" },
      ],
    };
  },
};
</script>

<style scoped>
/* Top Bar */
.top-bar {
  position: sticky;
  top: 0;
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
  z-index: 1001;
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
  position: sticky;
  top: 40px;
  z-index: 1000;
}

.logo-section {
  display: flex;
  align-items: center;       /* vertically center icon and text */
  gap: 10px;                 /* space between logo and text */
}

.logo-icon {
  width: 100px;               /* fixed width */
  height: 100px;              /* fixed height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;           /* hide overflow if image is too big */
  border-radius: 12px;       /* rounded corners */
  background-color: #fff;     /* optional background */
}

.logo-icon img {
  width: 100%;               /* fill container width */
  height: 100%;              /* fill container height */
  object-fit: contain;       /* keep aspect ratio */
}
.logo-text {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

/* Search Form */
.search-form {
  display: flex;
  max-width: 600px;
  flex-grow: 1;
  margin: 0 50px;
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

/* Cart Icon */
.cart-icon i {
  font-size: 1.5em;
  color: #333;
}

/* Navbar */
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
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

/* Category Dropdown */
.nav-item-wrapper {
  position: relative;
  cursor: pointer;
}
.category-dropdown-container {
   position: absolute;
  top: 100%;          
  left: 50%;          
  transform: translateX(-50%); 
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 250px;      
  border-radius: 4px;
  overflow: hidden;
  z-index: 1000;
}

.category-list {
  display: flex;
  flex-direction: column;
}
.category-item {
  padding: 10px 15px;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  background-color: #cae1ed ;
  color:white ;
  
}
.category-item:hover {
  font-size:large;
  transform:scale(1.01);
  transition:all 0.2s ease-out;

  
}
.category-item:last-child {
  border-bottom: none;
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
  .search-form {
    margin: 0 10px;
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
  }
  .mobile-toggle {
    display: block;
  }
  .category-dropdown-container {
    position: static;
    box-shadow: none;
    width: 100%;
  }
}
</style>
