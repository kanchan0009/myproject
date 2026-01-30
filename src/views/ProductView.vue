<template>
  <div class="product">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="product-container">
      <!-- ASIDE FILTER SECTION -->
      <aside class="filter-aside">
        <!-- Sort By -->
        <div class="filter-section">
          <div class="filter-title">Sort By</div>
          <select
            v-model="sortOption"
            @change="applyFilters"
            class="filter-select"
          >
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
              v-for="product in (category.products || []).slice(
                0,
                getExpandedState(category.type)
                  ? (category.products || []).length
                  : 5,
              )"
              :key="product.id"
              class="product-card"
            >
              <div class="product-image">
                <img :src="product.image" />
              </div>

              <div class="product-details">
                <div class="product-brand" v-if="product.brand">
                  {{ product.brand }}
                </div>
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
            v-if="category.products && category.products.length > 4"
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
        <router-link
          v-if="groupedProducts.length > 5"
          to="/categories"
          class="show-more-categories-btn"
        >
          View All Categories
          <i class="fa-solid fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/axios";

export default {
  data() {
    return {
      sortOption: "featured",
      minPrice: 0,
      maxPrice: 1000000,
      selectedBrands: [],
      selectedCategories: [],
      selectedTypes: [],
      brands: [],
      types: [],
      categories: [],
      products: [],
      expandedCategories: {},
      searchQuery: "",
      loading: true,
      error: null,
      selectedCategoryFromQuery: null,
    };
  },

  computed: {
    filteredProducts() {
      let filtered = [...this.products];

      if (this.selectedCategoryFromQuery) {
        filtered = filtered.filter(
          (p) => p.category.id == this.selectedCategoryFromQuery,
        );
      }

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.type?.toLowerCase().includes(q) ||
            p.category?.name.toLowerCase().includes(q),
        );
      }

      if (this.selectedBrands.length) {
        filtered = filtered.filter((p) =>
          this.selectedBrands.includes(p.brand),
        );
      }

      if (this.selectedCategories.length) {
        filtered = filtered.filter((p) =>
          this.selectedCategories.includes(p.category.name),
        );
      }

      if (this.selectedTypes.length) {
        filtered = filtered.filter((p) => this.selectedTypes.includes(p.type));
      }

      filtered = filtered.filter(
        (p) => p.price >= this.minPrice && p.price <= this.maxPrice,
      );

      if (this.sortOption === "low") filtered.sort((a, b) => a.price - b.price);
      if (this.sortOption === "high")
        filtered.sort((a, b) => b.price - a.price);

      return filtered;
    },

    groupedProducts() {
      const groups = {};
      this.filteredProducts.forEach((product) => {
        const key = product.category.name;
        if (!groups[key]) groups[key] = [];
        groups[key].push(product);
      });

      return Object.keys(groups).map((category) => ({
        type: category,
        products: groups[category],
      }));
    },
  },

  mounted() {
    this.checkQueryParams();
    this.fetchProducts();
  },

  watch: {
    "$route.query.category"(newCategory) {
      if (newCategory) {
        this.selectedCategoryFromQuery = newCategory.trim();
      } else {
        this.selectedCategoryFromQuery = null;
      }
      this.fetchProducts();
    },
  },

  methods: {
    getExpandedState(type) {
      return !!this.expandedCategories[type];
    },

    toggleCategory(type) {
      this.expandedCategories[type] = !this.expandedCategories[type];
    },

    async handleAddToCart(product) {
      try {
        await api.post("/api/cart/", {
          product_id: product.id,
          quantity: 1,
        });
        alert("Product added to cart!");
      } catch (err) {
        console.error("STATUS:", err.response?.status);
        console.error("DATA:", err.response?.data);
        alert("Failed to add product to cart");
      }
    },

    checkQueryParams() {
      const category = this.$route.query.category;
      if (category) {
        this.selectedCategoryFromQuery = category.trim();
      }
    },

    async fetchProducts() {
      try {
        this.loading = true;
        let allProducts = [];
        let url = "/api/products/";

        if (this.selectedCategoryFromQuery) {
          url += `?category=${encodeURIComponent(
            this.selectedCategoryFromQuery,
          )}`;
        }

        // Fetch all pages as before
        while (url) {
          const res = await api.get(url);
          const results = res.data.results || res.data;
          if (Array.isArray(results)) {
            allProducts = allProducts.concat(results);
          }

          if (res.data.next) {
            const nextUrl = new URL(res.data.next);
            url = nextUrl.pathname + nextUrl.search;
          } else {
            url = null;
          }
        }

        const typeMap = {
          TRA: "Traction",
          DIA: "Diagnostic",
          ELE: "Electrical",
          ULT: "Ultrasound",
          EXE: "Exercise",
          MON: "Monitoring",
          SUR: "Surgical",
          IMG: "Imaging",
          RES: "Respiratory",
          LAB: "Laboratory",
          REH: "Rehabilitation",
          FUR: "Furniture",
          DEN: "Dental",
          EME: "Emergency",
          INF: "Infusion",
          STE: "Sterilization",
          CON: "Consumables",
          ORT: "Orthopedic",
          MOB: "Mobility",
        };

        const brandMap = {
          DYN: "Dynamic",
          "3ML": "3ml",
          OMR: "Omron",
          WEL: "Wellness",
          ACC: "Accessories",
          ZIM: "Zimmer",
          CHA: "Chair",
          ENR: "Enr",
          PHY: "Physio",
          BTL: "Bottle",
          SWM: "Swim",
          MAS: "Mass",
          FST: "Fast",
          CAR: "Car",
          PEC: "Pec",
          TUT: "Tutorial",
          BBD: "Blood Bag Device",
          ANS: "Anesthesia",
          DON: "Donor",
          INV: "Inventory",
          MED: "Medical",
          OLY: "Olympus",
          EPP: "Eppendorf",
          PHI: "Philips",
          HIL: "Hill",
        };

        const mappedProducts = allProducts.map((p) => {
          const skuParts = (p.sku || "").split("-");
          const typeCode = skuParts[0] || "UNKNOWN";
          const brandCode = skuParts[1] || "UNKNOWN";

          const type = typeMap[typeCode] || typeCode;
          const brand = brandMap[brandCode] || brandCode;

          return {
            ...p,
            price: Number(p.price),
            image:
              p.images && p.images.length
                ? p.images[0].image
                : "/assets/medical.jpeg",
            type,
            brand,
          };
        });

        const groupedByCategory = {};
        mappedProducts.forEach((p) => {
          const catName = p.category.name;
          if (!groupedByCategory[catName]) groupedByCategory[catName] = [];
          // Only push first 5 products
          if (groupedByCategory[catName].length < 5) {
            groupedByCategory[catName].push(p);
          }
        });

        // Flatten grouped products back into array
        this.products = Object.values(groupedByCategory).flat();

        // Keep types, brands, categories as before
        this.types = [
          ...new Set(
            mappedProducts
              .map((p) => p.type)
              .filter(Boolean)
              .filter((t) => t !== "UNKNOWN"),
          ),
        ];
        this.brands = [
          ...new Set(
            mappedProducts
              .map((p) => p.brand)
              .filter(Boolean)
              .filter((b) => b !== "UNKNOWN"),
          ),
        ];
        this.categories = [
          ...new Set(mappedProducts.map((p) => p.category.name)),
        ];

        this.categories.forEach((cat) => {
          this.expandedCategories[cat] = false;
        });
      } catch (err) {
        console.error(err);
        this.error = "Failed to load products";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  max-width: 1700px;
  margin: 40px auto;
  display: flex;
  gap: 30px;
  padding: 0 20px;
}
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
  gap: 8px;
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
.show-more-categories-btn {
  background: #6fc6f5;
  text-decoration: none;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px auto 0;
  box-shadow: 0 4px 15px rgba(111, 198, 245, 0.3);
}
.show-more-categories-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(111, 198, 245, 0.4);
}
.show-more-categories-btn i {
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
  min-height: 320px;
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
  padding: 15px;
  font-size: medium;
}
.product-brand {
  color: #7ed9b0;
  margin-bottom: 2px;
}
.product-name {
  display: block;
  margin: 2px 0;
}
.product-price {
  color: #7ed9b0;
  font-weight: bold;
  margin-top: 2px;
}
.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
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
.filter-section {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.filter-title {
  font-size: medium;
  font-weight: bold;
  margin-bottom: 10px;
}

.filter-scroll {
  max-height: 200px;
  overflow-y: scroll;
  text-align: left;
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
  /* Keep sidebar and products side by side */
  div[style*="display: flex; gap: 30px;"] {
    flex-direction: row;
    gap: 10px;
    padding: 0 10px;
  }

  aside {
    width: 150px;
    flex-shrink: 0;
  }

  .products-by-category {
    flex: 1;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .product-card {
    min-height: 250px;
  }

  .product-image {
    height: 150px;
  }

  .product-details {
    padding: 10px;
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  div[style*="display: flex; gap: 30px;"] {
    flex-direction: row;
    padding: 0 5px;
    gap: 5px;
    max-width: 100%;
    margin: 15px auto;
  }

  aside {
    width: 100px;
    flex-shrink: 0;
    padding: 6px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  aside > div {
    margin-bottom: 20px;
    border: 0.2px solid #e5e5e5;
    border-radius: 8px;
  }

  aside > div:last-child {
    margin-bottom: 0;
  }
  .filter-aside {
    display: none;
  }

  /* .filter-section:first-child {
    background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
    border: 1px solid #b0c4de;
  } */

  .price-range-container {
    padding: 10px;
    margin-bottom: 15px;
  }

  .price-slider {
    height: 6px;
    border-radius: 3px;
  }

  .price-slider::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    margin-top: -5px;
  }

  .price-values {
    font-size: 11px;
    margin-top: 6px;
  }

  .products-by-category {
    flex: 1;
  }

  .category-section {
    margin-bottom: 15px;
  }

  .category-heading {
    font-size: 18px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #7ed9b0;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-bottom: 10px;
  }

  .product-card {
    height: 180px;
    min-height: 200px;
    width: 180px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }

  .product-image {
    height: 100px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }

  .product-image img {
    max-width: 90%;
    max-height: 85%;
  }

  .product-details {
    padding: 5px;
  }

  .product-brand {
    font-size: 11px;
    color: #6c757d;
    margin-bottom: 3px;
  }

  .product-name {
    font-size: 10px;
    margin: 3px 0;
    line-height: 1.2;
  }

  .product-price {
    font-size: 14px;
    font-weight: 700;
    margin-top: 5px;
    color: #28a745;
  }

  .product-actions {
    gap: 6px;
    margin-top: 10px;
  }

  .add-button {
    flex: 1;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 400;
    background: linear-gradient(135deg, #6fc6f5 0%, #4a90e2 100%);
    box-shadow: 0 2px 8px rgba(111, 198, 245, 0.3);
    white-space: nowrap;
  }

  .add-button:hover {
    background: linear-gradient(135deg, #5bb8f5 0%, #3a7bd5 100%);
  }

  .view-button {
    width: 35px;
    height: 28px;
    border-radius: 5px;
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
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 16px;
    margin-top: 8px;
  }

  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    font-size: 12px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  input[type="range"] {
    width: 100%;
  }

  /* Improve filter sections */
  aside div[style*="border: 1px solid #e5e5e5"] {
    border: 1px solid #dee2e6;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  /* Better spacing for filter labels */
  label {
    font-size: 12px;
    margin-bottom: 6px;
    display: flex;
    text-align: left;
  }

  /* Scrollable areas */
  .filter-scroll {
    max-height: 150px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #f8f9fa;
    text-align: left;
  }
}
</style>
