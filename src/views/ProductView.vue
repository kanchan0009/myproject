<template>
  <div class="product">
    <div
      style="
        max-width: 1700px;
        margin: 40px auto;
        display: flex;
        gap: 30px;
        padding: 0 20px;
      "
    >
      <!-- ASIDE FILTER SECTION -->
      <aside style="width: 300px">
        <!-- Sort By -->
        <div
          style="
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          "
        >
          <div style="font-weight: 600; margin-bottom: 12px">Sort By</div>
          <select v-model="sortOption" @change="applyFilters">
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="highest">Highest Price</option>
          </select>
        </div>

        <!-- Price Range -->
        <div class="price-range-container">
          <div class="title">Price Range</div>
          <input
            type="range"
            v-model="minPrice"
            :max="maxPrice"
            step="1000"
            class="price-slider"
            :style="{
              background: `linear-gradient(90deg, #6fc6f5 ${
                (minPrice / maxPrice) * 100
              }%, #e5e5e5 ${(minPrice / maxPrice) * 100}%)`,
            }"
          />
          <div class="price-values">
            <span
              >Min<br /><b>NPR {{ minPrice.toLocaleString() }}</b></span
            >
            <span
              >Max<br /><b>NPR {{ maxPrice.toLocaleString() }}</b></span
            >
          </div>
        </div>

        <!-- Brand Filter -->
        <div
          style="
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          "
        >
          <div style="font-weight: 600; margin-bottom: 12px">Brand</div>
          <div
            style="max-height: 180px; overflow-y: scroll; padding-right: 10px"
          >
            <div
              v-for="brand in brands"
              :key="brand"
              style="margin-bottom: 10px"
            >
              <label
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  cursor: pointer;
                "
              >
                <input
                  type="checkbox"
                  :value="brand"
                  v-model="selectedBrands"
                  style="width: 16px; height: 16px"
                />
                <span>{{ brand }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Type Filter -->
        <div
          style="
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          "
        >
          <div style="font-weight: 600; margin-bottom: 12px">Type</div>
          <div
            style="max-height: 180px; overflow-y: scroll; padding-right: 10px"
          >
            <div v-for="type in types" :key="type" style="margin-bottom: 10px">
              <label
                style="
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  cursor: pointer;
                "
              >
                <input
                  type="checkbox"
                  :value="type"
                  v-model="selectedTypes"
                  style="width: 16px; height: 16px"
                />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      <!-- Products by Category -->
      <div class="products-by-category">
        <div
          v-for="category in groupedProducts"
          :key="category.type"
          class="category-section"
        >
          <h2 class="category-heading">{{ category.type }}</h2>
          <div class="products-grid">
            <div
              v-for="product in category.products.slice(
                0,
                getExpandedState(category.type) ? category.products.length : 4,
              )"
              :key="product.id"
              class="product-card"
            >
              <div class="product-image">
                <img
                  :src="
                    product.images && product.images[0]
                      ? product.images[0]
                      : '/assets/medical.jpeg'
                  "
                  alt=""
                />
              </div>

              <div class="product-details">
                <div class="product-brand">{{ product.brand }}</div>
                <b class="product-name">{{ product.name }}</b>
                <div class="product-price">
                  NPR {{ product.price.toLocaleString() }}
                </div>

                <div class="product-actions">
                  <button class="add-button" @click="handleAddToCart(product)">
                    <i class="fa-solid fa-cart-shopping"></i> Add
                  </button>
                  <!-- View Details Button -->
                  <router-link
                    :to="{
                      name: 'ProductDetail',
                      params: { productId: product.id },
                    }"
                    class="view-button"
                  >
                    <i class="fa-regular fa-eye"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <button
            v-if="category.products.length > 4"
            class="show-more-btn"
            @click="toggleCategory(category.type)"
          >
            {{ expandedCategories[category.type] ? "Show Less" : "Show More" }}
            <i
              :class="
                expandedCategories[category.type]
                  ? 'fa-solid fa-chevron-up'
                  : 'fa-solid fa-chevron-down'
              "
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, inject } from "vue";
import products from "@/data/products.json";

export default {
  data() {
    const types = [...new Set(products.map((p) => p.type))];
    const expandedCategories = reactive({});
    types.forEach((type) => {
      expandedCategories[type] = false;
    });
    return {
      sortOption: "featured",
      minPrice: 0,
      maxPrice: 100000,
      selectedBrands: [],
      selectedTypes: [],
      brands: [...new Set(products.map((p) => p.brand))],
      types: types,
      products: products,
      expandedCategories: expandedCategories,
      searchQuery: "",
    };
  },

  setup() {
    const addToCart = inject("addToCart");
    const showToast = inject("showToast");
    return { addToCart, showToast };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      // Search Filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.type.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query)),
        );
      }

      // Brand Filter
      if (this.selectedBrands.length > 0) {
        filtered = filtered.filter((p) =>
          this.selectedBrands.includes(p.brand),
        );
      }

      // Type Filter
      if (this.selectedTypes.length > 0) {
        filtered = filtered.filter((p) => this.selectedTypes.includes(p.type));
      }

      // Price Filter
      filtered = filtered.filter(
        (p) => p.price >= this.minPrice && p.price <= this.maxPrice,
      );

      // Sorting
      if (this.sortOption === "low") filtered.sort((a, b) => a.price - b.price);
      else if (this.sortOption === "high")
        filtered.sort((a, b) => b.price - a.price);
      else if (this.sortOption === "highest") {
        const maxPriceProduct = filtered.reduce(
          (prev, curr) => (curr.price > prev.price ? curr : prev),
          filtered[0],
        );
        filtered = [maxPriceProduct];
      }

      return filtered;
    },
    groupedProducts() {
      const groups = {};
      this.filteredProducts.forEach((product) => {
        if (!groups[product.type]) {
          groups[product.type] = [];
        }
        groups[product.type].push(product);
      });
      return Object.keys(groups)
        .map((type) => ({
          type,
          products: groups[type],
        }))
        .slice(0, 5);
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    if (type) {
      this.selectedTypes = [type];
    }
    const search = urlParams.get("search");
    if (search) {
      this.searchQuery = search;
    }
  },
  watch: {
    $route(to) {
      const search = to.query.search;
      if (search) {
        this.searchQuery = search;
      } else {
        this.searchQuery = "";
      }
    },
  },
  methods: {
    applyFilters() {
      // Trigger computed reactivity
    },
    toggleCategory(type) {
      this.expandedCategories[type] = !this.expandedCategories[type];
    },
    getExpandedState(type) {
      return this.expandedCategories[type] || false;
    },
    handleAddToCart(product) {
      this.addToCart(product);
      this.showToast("Product added to cart!", "success");
    },
  },
};
</script>

<style scoped>
.price-range-container {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}
.price-range-container .title {
  font-weight: 600;
  margin-bottom: 15px;
}
.price-slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  outline: none;
  margin: 0;
} /* Thumb */
.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #6fc6f5;
  border: 2px solid #fff;
  cursor: pointer;
  margin-top: -6px; /* center thumb on track */
}
.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #6fc6f5;
  cursor: pointer;
  margin-top: -6px;
}
.price-values {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
}
.products-by-category {
  flex: 0.9;
}
.category-section {
  margin-bottom: 30px;
}
.category-heading {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 3px solid #7ed9b0;
  padding-bottom: 10px;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}
.show-more-btn {
  background: #6fc6f5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(111, 198, 245, 0.3);
}
.show-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(111, 198, 245, 0.4);
}
.show-more-btn i {
  transition: transform 0.3s ease;
}
.product-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 320px;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.product-image {
  background: #f8f9fa;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.product-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.product-details {
  padding: 20px;
}
.product-brand {
  color: #7ed9b0;
}
.product-name {
  display: block;
  margin: 5px 0;
}
.product-price {
  color: #7ed9b0;
  font-weight: bold;
  margin-top: 5px;
}
.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.add-button {
  flex: 1;
  background: #6fc6f5;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}
.add-button i {
  margin-right: 5px;
}
.view-button {
  width: 40px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}
/* Tablet screens */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  aside {
    width: 250px;
  }
}

/* Small tablets / large phones */
@media (max-width: 768px) {
  /* Stack sidebar above products */
  div[style*="display: flex; gap: 30px;"] {
    flex-direction: column;
  }

  aside {
    width: 100%;
    order: 1; /* Sidebar on top */
    margin-bottom: 20px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-card {
    text-align: center;
  }

  .product-details {
    padding: 10px;
  }

  .product-image {
    height: 180px;
  }

  .product-actions {
    flex-direction: column;
  }

  .add-button,
  .view-button {
    width: 100%;
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  div[style*="display: flex; gap: 30px;"] {
    flex-direction: column;
    padding: 0 15px;
    gap: 20px;
  }

  aside {
    width: 100%;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  aside > div {
    margin-bottom: 25px;
  }

  aside > div:last-child {
    margin-bottom: 0;
  }

  .price-range-container {
    padding: 15px;
    margin-bottom: 25px;
  }

  .price-slider {
    height: 8px;
    border-radius: 4px;
  }

  .price-slider::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
    margin-top: -5px;
  }

  .price-values {
    font-size: 12px;
    margin-top: 8px;
  }

  .products-by-category {
    flex: 1;
  }

  .category-section {
    margin-bottom: 25px;
  }

  .category-heading {
    font-size: 22px;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 2px solid #7ed9b0;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 15px;
  }

  .product-card {
    height: auto;
    min-height: 280px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }

  .product-image {
    height: 180px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }

  .product-image img {
    max-width: 85%;
    max-height: 85%;
  }

  .product-details {
    padding: 15px;
  }

  .product-brand {
    font-size: 12px;
    color: #6c757d;
    margin-bottom: 5px;
  }

  .product-name {
    font-size: 16px;
    margin: 5px 0;
    line-height: 1.3;
  }

  .product-price {
    font-size: 16px;
    font-weight: 700;
    margin-top: 8px;
    color: #28a745;
  }

  .product-actions {
    gap: 8px;
    margin-top: 15px;
  }

  .add-button {
    flex: 1;
    padding: 10px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    background: linear-gradient(135deg, #6fc6f5 0%, #4a90e2 100%);
    box-shadow: 0 2px 8px rgba(111, 198, 245, 0.3);
  }

  .add-button:hover {
    background: linear-gradient(135deg, #5bb8f5 0%, #3a7bd5 100%);
  }

  .view-button {
    width: 45px;
    height: 35px;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    background: #fff;
    color: #6c757d;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .view-button:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
  }

  .show-more-btn {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 20px;
    margin-top: 10px;
  }

  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  input[type="range"] {
    width: 100%;
  }

  /* Improve filter sections */
  aside div[style*="border: 1px solid #e5e5e5"] {
    border: 1px solid #dee2e6;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  /* Better spacing for filter labels */
  label {
    font-size: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Scrollable areas */
  div[style*="max-height: 180px"] {
    max-height: 150px;
    border-radius: 6px;
    background: #f8f9fa;
    padding: 10px;
  }
}
</style>
