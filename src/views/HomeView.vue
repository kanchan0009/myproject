<template>
  <h1 class="section-heading">Products</h1>

  <div class="container">
    <div class="card-grid">
      <div
        class="category-card"
        v-for="(category, index) in categories"
        :key="index"
      >
        <h3 class="card-title">{{ category.title }}</h3>

        <div class="image-grid">
          <!-- Always create space for exactly 4 images -->
          <div class="image-item" v-for="(n, index) in 4" :key="index">
            <!-- Show image and label if product exists, otherwise leave space -->
            <template v-if="category.items[n]">
              <!-- Link to ProductDetail using dynamic id -->
              <router-link :to="`/productdetail/${category.items[n].id}`">
                <!-- Show first image if exists, otherwise placeholder -->
                <img
                  v-if="
                    category.items[n].images && category.items[n].images.length
                  "
                  :src="category.items[n].images[0]"
                  :alt="category.items[n].name"
                />
                <img
                  v-else
                  :src="require('@/assets/medical.jpeg')"
                  :alt="category.items[n].name"
                  class="placeholder-image"
                />
              </router-link>

              <p class="image-label">
                {{ category.items[n].name || "Unnamed Product" }}
              </p>
            </template>
            <!-- If no product, just empty space -->
          </div>
        </div>

        <div class="seedetail">
          <router-link to="/products">
            See More <span class="arrow">&#8594;</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="brands-section">
    <h1 class="section-title">Trusted Brands</h1>

    <div class="brands-container">
      <div
        class="brand-card"
        v-for="(brand, index) in brands"
        :key="index"
        @click="selectBrand(brand)"
      >
        {{ brand.name }}
      </div>
    </div>
  </div>
  <div class="app-banner">
    <div class="content-left">
      <h1 class="main-heading">Shop on the Go</h1>
      <p class="sub-text">
        Download our mobile app for exclusive deals and faster checkout
      </p>
      <div class="buttons-container">
        <router-link to="/" class="app-button" type="button"
          >Android
        </router-link>
        <router-link to="/" class="app-button" type="button">ios </router-link>
      </div>
    </div>
    <div class="content-right">
      <p class="available-text">Also available on</p>
      <a href="https://www.daraz.com.np" class="daraz-link">Daraz.np</a>
    </div>
  </div>
  <div class="banner-section">
    <h1 class="main-heading-s">Ready to Transform Your Practice?</h1>
    <p class="sub-text-s">
      Join hundreds of clinics that have upgraded their equipment with us. Get
      expert guidance and premium products today.
    </p>
    <div class="buttons-group">
      <router-link to="/contact" class="btn btn-primary"
        >Schedule Consultation</router-link
      >

      <a class="btn btn-secondary" href="https://www.daraz.com.np/"
        >Visit on Daraz<span>&rarr;</span></a
      >
    </div>
  </div>
</template>
<script>
import products from "@/data/products.json";

export default {
  setup() {
    const category = () => {
      window.location.href = "/categories";
    };
    const products = () => {
      window.location.href = "/products";
    };
    return {
      category,
      products,
    };
  },

  data() {
    return {
      brands: [
        { name: "BTL" },
        { name: "Enraf Nonius" },
        { name: "Dynatron" },
        { name: "Intelect" },
        { name: "Chattanooga" },
        { name: "Storz Medical" },
      ],
      activeCategory: 0,
      categories: [], // Will be populated in created() hook
    };
  },
  methods: {
    goToProduct(id) {
      this.$router.push(`/products/${id}`);
    },
    addToCart(product) {
      console.log("Added to cart:", product.title);
    },
    selectBrand(brand) {
      console.log("Selected Brand:", brand.name);
    },
    selectCategory(index) {
      this.activeCategory = index;
      console.log("Selected category:", this.categories[index].name);
    },
  },
  created() {
    // Group products by type
    const grouped = {};

    products.forEach((product) => {
      if (!grouped[product.type]) grouped[product.type] = [];
      grouped[product.type].push(product);
    });

    // Convert to array format for v-for and limit to 8 categories for 2 rows
    this.categories = Object.keys(grouped)
      .map((typeName) => ({
        title: typeName,
        items: grouped[typeName],
      }))
      .slice(0, 8);
  },
};
</script>
<style>
.seedetail {
  text-align: left; /* Align to left */
  border-top: 1px solid #add8e6; /* Light blue top border */
  padding-top: 10px; /* Space between border and text */
  margin-top: 10px; /* Space above the border if needed */
}

.seedetail a {
  text-decoration: none; /* Remove underline */
  font-size: 18px; /* Increase font size */
  color: #007bff; /* Optional link color */
  display: inline-flex; /* For arrow alignment */
  align-items: center;
  gap: 5px; /* Space between text and arrow */
}

.seedetail a:hover {
  color: #0056b3; /* Darker on hover */
}

.seedetail .arrow {
  font-size: 20px; /* Bigger arrow */
}

.container {
  padding: 20px;
  background: #f5f7fa;
  max-width: 1300px;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 480px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
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
}

.image-item {
  text-align: center;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 10px;
}

.image-item img,
.placeholder-image {
  width: 100%;
  height: 150px;
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
    grid-template-columns: 1fr;
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
  color: #111111;
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
  font-size: 15px;
  color: #6b6b6b;
}

.badge {
  position: absolute;
  top: 18px;
  right: 18px;
  background-color: #6fc6f5;
  color: #ffffff;
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
  padding: 2rem 0.5rem 0 0.5rem;
  margin: 0 auto;
  max-width: 1320px;
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
  background: radial-gradient(circle, #7ed9b0 0%, #6fc6f5 70%);

  color: white;
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
  color: #2c3e50;
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
  color: white;
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
  background-color: white;
  color: #6fc6f5;
  border: none;
  border-radius: 4px;
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.app-button:hover {
  background-color: #f0f0f0;
  color: #004c7a;
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
  color: white;
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
  color: black;
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
  background-color: #6fc6f5;
  color: white;
  border-color: #6fc6f5;
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
  color: #7ed9b0;
  border-color: #7ed9b0;
  font-size: medium;
}

.btn-secondary span {
  margin-left: 8px;
}

.btn-secondary:hover {
  background-color: #7ed9b0;
  color: white;
  text-decoration: none;
}
/* Mobile phones */
@media (max-width: 480px) {
  .section-heading {
    font-size: 24px;
    padding: 1rem 0.5rem 0 0.5rem;
  }

  .container {
    padding: 10px;
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .category-card {
    padding: 20px 15px;
    height: auto;
    min-height: 400px;
  }

  .card-title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .image-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px;
  }

  .image-item {
    min-height: 120px;
    padding: 8px;
  }

  .image-item img,
  .placeholder-image {
    height: 100px;
  }

  .image-label {
    font-size: 11px;
  }

  .seedetail {
    padding-top: 8px;
    margin-top: 8px;
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
