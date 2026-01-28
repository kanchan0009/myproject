<template>
  <header class="navbar">
    <div class="nav-left">
      <button class="categories-btn" @click="toggleMenu">☰ Categories</button>
    </div>
  </header>

  <!-- Overlay -->
  <div v-if="isOpen" class="overlay" @click="closeMenu"></div>

  <!-- Side Menu -->
  <aside class="side-menu" :class="{ open: isOpen }">
    <div class="menu-content">
      <div class="categories-list">
        <div
          class="category-section"
          v-for="(category, index) in categories"
          :key="index"
          @mouseenter="showSubmenu(index)"
          @mouseleave="hideSubmenu"
        >
          <router-link
            :to="`/products?type=${category.title}`"
            class="category-link"
            @click="closeMenu"
          >
            {{ category.title }}
          </router-link>
        </div>
      </div>

      <!-- Subcategory View for products -->
      <SubcategoryView
        v-if="activeCategory !== null"
        :category-name="categories[activeCategory].title"
        :products="categories[activeCategory].items"
        :style="subcategoryStyle"
        class="subcategory-container"
        @mouseenter="onSubcategoryEnter"
        @mouseleave="onSubcategoryLeave"
      />
    </div>

    <div class="menu-footer">
      <router-link to="/categories" class="see-all-btn" @click="closeMenu">
        See all
      </router-link>
    </div>
  </aside>
</template>
<script>
import products from "@/data/products.json";
import SubcategoryView from "@/views/SubcategoryView.vue";

export default {
  name: "Navbar",
  components: {
    SubcategoryView,
  },
  data() {
    return {
      isOpen: false,
      categories: [],
      activeCategory: null,
      hideTimeout: null,
    };
  },
  created() {
    // Group products by type for navigation menu
    const grouped = {};

    products.forEach((product) => {
      if (!grouped[product.type]) grouped[product.type] = [];
      grouped[product.type].push({
        id: product.id,
        name: product.name,
      });
    });

    // Convert to array format for v-for
    this.categories = Object.keys(grouped).map((typeName) => ({
      title: typeName,
      items: grouped[typeName],
    }));
  },
  computed: {
    subcategoryStyle() {
      if (this.activeCategory === null) return {};
      // Position beside the active category
      const categoryHeight = 32; // approximate height of category-section
      const top = this.activeCategory * categoryHeight + 8; // 8px padding
      return {
        position: "absolute",
        top: `${top}px`,
        left: "100%",
        zIndex: 1000,
      };
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      document.body.classList.toggle("menu-open", this.isOpen);
    },
    closeMenu() {
      this.isOpen = false;
      document.body.classList.remove("menu-open");
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      this.activeCategory = null;
    },
    menuItemClick() {
      this.closeMenu();
      document.body.classList.remove("menu-open");
    },
    showSubmenu(index) {
      this.activeCategory = index;
    },
    hideSubmenu() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      this.hideTimeout = setTimeout(() => {
        this.activeCategory = null;
      }, 1000);
    },
    onSubcategoryEnter() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
    },
    onSubcategoryLeave() {
      this.hideTimeout = setTimeout(() => {
        this.activeCategory = null;
      }, 100);
    },
  },
};
</script>
<style scoped>
/* Navbar */
.navbar {
  background: linear-gradient(135deg, #6fc6f5 0%, #7ed9b0 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  color: white;
  font-weight: bold;
  z-index: 100;
  position: sticky;
  top: 0px;
  box-shadow: 0 2px 10px rgba(111, 198, 245, 0.3);
}
body.menu-open .navbar {
  display: none;
}

.categories-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
}
.side-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease;
  box-shadow: 2px 0 10px rgba(111, 198, 245, 0.2);
}
body.menu-open {
  overflow: hidden;
}

.side-menu.open {
  left: 0;
}

.menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.category-section {
  padding: 8px 16px;
}

.category-link {
  color: #000000;
  text-decoration: none;
  font-size: 15px;
  font-weight: normal;
  display: block;
  padding: 6px 0;
  cursor: pointer;
  text-align: left;
}

.category-link:hover {
  background: linear-gradient(90deg, #f0f8ff 0%, #e6f7ff 100%);
  color: #6fc6f5;
  border-left: 3px solid #6fc6f5;
  padding-left: 12px;
  transition: all 0.2s ease;
}

/* Submenu */
.submenu {
  margin-left: 16px;
  margin-top: 4px;
  background: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submenu-item {
  border-bottom: 1px solid #e9ecef;
}

.submenu-item:last-child {
  border-bottom: none;
}

.submenu-link {
  display: block;
  padding: 8px 12px;
  color: #495057;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.submenu-link:hover {
  background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1976d2;
  padding-left: 16px;
}

/* Footer */
.menu-footer {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
}

.see-all-btn {
  width: 100%;
  background: linear-gradient(135deg, #6fc6f5 0%,#086239 100%);
  border: none;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  display: block;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.see-all-btn:hover {
  background: linear-gradient(135deg, #5bb8e5 0%, #086239 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(111, 198, 245, 0.4);
}
.side-menu.open ~ .navbar,
.side-menu.open + .navbar {
  display: none;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .navbar {
    padding: 12px 4%;
  }

  .categories-btn {
    font-size: 15px;
    padding: 8px 12px;
  }

  .side-menu {
    width: 280px;
    left: -280px;
  }

  .menu-content {
    padding: 6px 0;
  }

  .category-section {
    padding: 6px 12px;
  }

  .submenu {
    margin-left: 12px;
  }

  .submenu-link {
    padding: 6px 10px;
    font-size: 13px;
  }

  .menu-footer {
    padding: 10px 12px;
  }

  .see-all-btn {
    padding: 10px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 10px 3%;
  }

  .categories-btn {
    font-size: 14px;
    padding: 6px 10px;
  }

  .side-menu {
    width: 260px;
    left: -260px;
  }

  .menu-content {
    padding: 4px 0;
  }

  .category-section {
    padding: 4px 10px;
  }

  .submenu {
    margin-left: 8px;
  }

  .submenu-link {
    padding: 4px 8px;
    font-size: 12px;
  }

  .menu-footer {
    padding: 8px 10px;
  }

  .see-all-btn {
    padding: 8px;
    font-size: 12px;
  }
}
</style>
