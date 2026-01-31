<template>
  <h1 class="section-heading">Products</h1>

  <div v-if="error" class="error-message">{{ error }}</div>
  <div v-if="loading" class="loading">Loading products...</div>

  <div v-else class="container">
    <div class="card-grid">
      <div
        class="category-card"
        v-for="(category, catIndex) in categories"
        :key="catIndex"
      >
        <h3 class="card-title">{{ category.title }}</h3>

        <div class="image-grid">
          <!-- exactly 4 slots -->
          <template v-for="index in 4" :key="index">
            <router-link
              v-if="category.items[index - 1]"
              :to="`/productdetail/${category.items[index - 1].id}`"
              class="image-item"
              style="display: flex; width: 100%"
            >
              <img
                :src="
                  category.items[index - 1].images?.[0] ||
                  '/assets/medical.jpeg'
                "
                :alt="category.items[index - 1].name"
              />
              <p class="image-label">
                {{ category.items[index - 1].name }}
              </p>
            </router-link>

            <div v-else class="image-item no-image">No Product</div>
          </template>
        </div>

        <div class="seedetail">
          <router-link to="/products">
            See More <span class="arrow">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- BRANDS -->
  <div class="brands-section">
    <h1 class="section-title">Trusted Brands</h1>

    <div class="brands-container">
      <div class="brand-card" v-for="(brand, index) in brands" :key="index">
        {{ brand.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      categories: [],
      brands: [
        { name: "BTL" },
        { name: "Enraf Nonius" },
        { name: "Dynatron" },
        { name: "Intelect" },
        { name: "Chattanooga" },
        { name: "Storz Medical" },
      ],
      loading: false,
      error: null,
      categories: [],
    };
  },

  methods: {
    normalize(value) {
      if (!value) return null;

      return value
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "");
    },

    async fetchHomeData() {
      this.loading = true;
      this.error = null;

      // Helper to fetch all pages from a paginated DRF endpoint
      const fetchAllPages = async (url) => {
        let results = [];
        let nextUrl = url;

        while (nextUrl) {
          const res = await axios.get(nextUrl);
          if (Array.isArray(res.data)) {
            // If API is not paginated, just return data
            results = res.data;
            break;
          } else if (res.data?.results) {
            // Paginated response
            results.push(...res.data.results);
            nextUrl = res.data.next; // DRF provides `next` link
          } else {
            // Unknown format
            break;
          }
        }

        return results;
      };

      try {
        // Fetch all categories and all products
        const [categories, products] = await Promise.all([
          fetchAllPages("http://127.0.0.1:8000/api/categories/"),
          fetchAllPages("http://127.0.0.1:8000/api/products/"),
        ]);

        // ---- GROUP PRODUCTS BY CATEGORY NAME ----
        const groupedProducts = {};
        products.forEach((product) => {
          const key = this.normalize(product?.category?.name);
          if (!key) return;

          if (!groupedProducts[key]) groupedProducts[key] = [];
          groupedProducts[key].push(product);
        });

        // ---- MAP CATEGORIES WITH PRODUCTS ----
        this.categories = categories
          .map((cat) => {
            const key = this.normalize(cat.name);
            return {
              id: cat.id,
              title: cat.name,
              slug: cat.slug,
              image: cat.image,
              items: groupedProducts[key] || [],
            };
          })
          .filter((cat) => cat.items.length > 0); // remove categories with no products
      } catch (err) {
        console.error("API ERROR:", err);
        if (err.response) {
          this.error = `Failed to load data (${err.response.status})`;
        } else {
          this.error = "Server not reachable";
        }
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchHomeData();
  },
};
</script>

<style scoped>
.seedetail {
  text-align: left; /* Align to left */
  border-top: 1px solid var(--primary-color); /* Theme primary color top border */
  padding-top: 10px; /* Space between border and text */
  margin-top: 10px; /* Space above the border if needed */
}

.seedetail a {
  text-decoration: none; /* Remove underline */
  font-size: medium; /* Small font size */
  color: var(--text-color); /* Theme text color */
  display: inline-flex; /* For arrow alignment */
  align-items: center;
  gap: 5px; /* Space between text and arrow */
}

.seedetail a:hover {
  color: var(--accent-color); /* Theme accent color on hover */
}

.seedetail .arrow {
  font-size: 20px; /* Bigger arrow */
}

.container {
  padding: 20px;
  background: #f5f7fa;
  max-width: 1380px;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.category-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 300px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  flex: 1;
}

.image-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 8px;
  flex: 1;
  min-height: 140px;
  width: 100%;
}

.image-item img,
.placeholder-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}

.no-image {
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6fc6f5;
  font-size: 14px;
  font-weight: 500;
}

.image-label {
  font-size: 12px;
  margin-top: 6px;
  color: #333;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .category-card {
    padding: 15px 10px;
    height: auto;
    min-height: 100px;
  }
}

.show-products:hover {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}
.nav-sale:hover {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.category-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 10px;
  margin-top: 5px;
}
.category-card:hover {
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  cursor: pointer;
}

.category-card p {
  font-size: 13px;
  color: #6b6b6b;
  text-decoration: none;
}

.badge {
  position: absolute;
  top: 18px;
  right: 18px;
  background-color: var(--primary-color);
  color: var(--background-color);
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
}

.view-all-btn {
  display: block;
  margin: 10px auto 0;
  background: #7ed9b0;
  color: #ffffff;
  border: none;
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
}
.best-sellers-container {
  background: rgb(236, 234, 234);
  padding: 20px;
  max-width: 100%;
  margin-top: 80px;
}

.section-heading {
  font-weight: 700;
  font-size: 30px;
  color: #333;

  text-align: left;
  padding: 2rem 0.5rem 1rem 0.5rem;
  margin: 0 auto;
  max-width: 1320px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background: #ffe6e6;
  border: 1px solid #ff9999;
  border-radius: 5px;
}

.product-grid {
  padding: 0px 80px 30px 80px;
  display: grid;

  grid-template-columns: repeat(4, 1fr);
}

.product-card {
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.image-container {
  position: relative;
  width: 100%;

  aspect-ratio: 16 / 9;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.product-card:hover {
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #6fc6f5;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.product-details {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 16px;
  color: #333;
  margin: 0 0 10px 0;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.star {
  color: #ffb700;
  margin-right: 5px;
}

.rating-value {
  font-size: 14px;
  color: #666;
}

.price-container {
  margin-top: auto;
  margin-bottom: 15px;
}

.current-price {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  display: block;
}

.old-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.add-to-cart-button {
  width: 100%;
  background: radial-gradient(
    circle,
    var(--secondary-color) 0%,
    var(--primary-color) 70%
  );

  color: var(--background-color);
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  transform: scaleX(1.01);
}
.brands-section {
  padding: 60px 20px;
  text-align: center;
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 30px;
}

.brands-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 1700px;
  margin: 0 auto;
  padding: 0px 60px 0px 60px;
}

.brand-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  flex: 1;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
}
.brand-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .brands-container {
    flex-wrap: wrap;
  }
  .brand-card {
    flex-basis: calc(50% - 20px);
    margin-bottom: 10px;
  }
}
.app-banner {
  background: radial-gradient(circle, #6fc6f5 0%, #6fc6f5 60%, #7ed9b0 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 10%;
  color: white;
  height: 250px;
}

.content-left {
  text-align: left;
  max-width: 60%;
}

.main-heading {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: var(--background-color);
}

.sub-text {
  font-size: 16px;
  margin: 0 0 20px 0;
  opacity: 0.9;
  color: white;
}

.buttons-container {
  display: flex;
  gap: 15px;
}

.app-button {
  text-decoration: none;
  background-color: var(--background-color);
  color: var(--primary-color);
  border: none;
  border-radius: 4px;
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.app-button:hover {
  background-color: var(--light-background);
  color: var(--accent-color);
}

.content-right {
  text-align: right;
}

.available-text {
  font-size: 14px;
  margin: 0 0 5px 0;
  opacity: 0.8;
}

.daraz-link {
  color: var(--background-color);
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  transition: text-decoration 0.3s;
}

.daraz-link:hover {
  text-decoration: underline;
}
.banner-section {
  padding: 80px 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.main-heading-s {
  font-size: 36px;
  font-weight: bold;
  color: black;
  margin-bottom: 20px;
}

.sub-text-s {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 30px;
  line-height: 1.5;
}

.buttons-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  padding: 12px 24px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  outline: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--background-color);
  border-color: var(--primary-color);
  text-decoration: none;
}

.btn-primary:hover {
  background-color: #6fc6f5;
  border-color: #6fc6f5;
  text-decoration: none;
  color: white;
}

.btn-secondary {
  text-decoration: none;
  background-color: transparent;
  color: var(--secondary-color);
  border-color: var(--secondary-color);
  font-size: medium;
}

.btn-secondary span {
  margin-left: 8px;
}

.btn-secondary:hover {
  background-color: var(--secondary-color);
  color: var(--background-color);
  text-decoration: none;
}
/* Mobile phones */
@media (max-width: 480px) {
  .section-heading {
    font-size: 24px;
    padding: 1rem 0.5rem 0 0.5rem;
  }

  /* Container full width */
  .container {
    width: 100%;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
  }

  /* Category Cards Grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 10px;
    width: 100%;
  }

  .category-card {
    width: 100%;
    padding: 15px 10px;
    height: 350px;
    min-height: 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-title {
    font-size: 10px;
    margin-bottom: 5px;
  }

  /* Image Grid inside category card */
  .image-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 columns */
    grid-template-rows: repeat(2, minmax(0, 1fr)); /* 2 rows */
    gap: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  .image-item {
    min-width: 0; /* prevents overflow */
    min-height: 80px;
    height: 30px;
    padding: 4px;
    box-sizing: border-box;
  }

  .image-item img,
  .placeholder-image {
    width: 100%;
    height: 60px;
    object-fit: cover;
    display: block;
  }
  .category-card p {
    text-decoration: none;
  }

  .image-label {
    font-size: 8px;
    overflow: visible;
    word-wrap: break-word;
    text-decoration: none;
  }

  /* See detail link */
  .seedetail {
    padding-top: 8px;
    margin-top: 8px;
    border-top: 0.5px solid rgb(215, 211, 211);
  }

  .seedetail a {
    font-size: 16px;
  }

  .seedetail .arrow {
    font-size: 18px;
  }

  .brands-section {
    padding: 40px 10px;
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .brands-container {
    gap: 15px;
    padding: 0 10px;
  }

  .brand-card {
    padding: 15px;
    font-size: 12px;
  }

  .app-banner {
    flex-direction: column;
    text-align: center;
    padding: 30px 5%;
    height: auto;
  }

  .content-left {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .main-heading {
    font-size: 28px;
  }

  .sub-text {
    font-size: 14px;
  }

  .buttons-container {
    justify-content: center;
    gap: 10px;
  }

  .app-button {
    padding: 8px 20px;
    font-size: 14px;
  }

  .content-right {
    margin-top: 20px;
  }

  .available-text {
    font-size: 12px;
  }

  .daraz-link {
    font-size: 16px;
  }

  .banner-section {
    padding: 60px 10px;
  }

  .main-heading-s {
    font-size: 28px;
  }

  .sub-text-s {
    font-size: 14px;
    margin-bottom: 25px;
  }

  .buttons-group {
    gap: 10px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
