<template>
  <div class="box">
    <span>Professional Physiotherapy Equipment</span>
    <a
      class="top-link"
      href="https://www.daraz.com.np"
      target="_blank"
      rel="noopener"
    >
      Visit us on Daraz.np</a
    >
  </div>
  <header
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 5%;
      background-color: #ffffff;
      border-bottom: 1px solid #e0e0e0;
      height: 70px;
    "
  >
    <div style="display: flex; align-items: center">
      <div
        style="
          background-color: green;
          width: 40px;
          height: 40px;
          border-radius: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-weight: bold;
          margin-right: 10px;
        "
      >
        P
      </div>
      <span style="font-size: 1.2em; font-weight: bold; color: #333333"
        >PhysioNepal</span
      >
    </div>

    <div style="flex-grow: 1; margin: 0 50px">
      <form
        style="
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #cccccc;
          border-radius: 20px;
          overflow: hidden;
        "
      >
        <input
          type="text"
          placeholder="Search products....."
          style="padding: 10px 15px; border: none; flex-grow: 1; outline: none"
        />

        <button
          type="submit"
          style="
            background-color: #f1f1f1;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
          "
        >
          <i class="fas fa-search" style="color: #888888"></i>
        </button>
      </form>
    </div>

    <div>
      <i
        class="fas fa-shopping-cart"
        style="font-size: 1.5em; color: #333333"
      ></i>
      <!-- Cart Icon -->
    </div>
  </header>

  <nav class="navbar">
    <div class="nav-container">
      <ul class="nav-menu">
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

      <!-- Mobile menu toggle (optional) -->
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

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
      isMobileMenuOpen,
      toggleMobileMenu,
    };
  },
};
</script>

<style scoped>
.brand,
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.search-box input {
  width: auto;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
}
.icon {
  background: white;
  color: black;
}
.box-container {
  padding: 5px;
  margin-top: 1px;
  background: white;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: green;
}
.box {
  top: 0px;
  position: sticky;
  background: green;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-weight: bold;
}
.top-link {
  color: white;
  text-decoration: none;

  color: white;
}

.top_link:hover {
  margin-right: 3px;
  text-decoration: underline;
}

.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.nav-brand {
  margin-right: 40px;
}

.brand-link {
  text-decoration: none;
  color: #333;
  font-size: 20px;
  font-weight: bold;
}

.brand-text {
  color: #2c3e50;
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
}

.nav-link {
  text-decoration: none;
  color:black;
  font-size: 16px;
  font-weight: 300;
  padding: 4px 0;
  position: relative;
  transition: color 0.3s ease;
  letter-spacing: 0.5px;
}

.nav-link:hover {
  color: rgb(29, 28, 28);
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

/* Responsive Design */
@media (max-width: 768px) {
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
}
</style>
