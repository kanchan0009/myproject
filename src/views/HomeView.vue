<template>
  <section class="featured-categories">
    <h2>Featured Categories</h2>
    <div class="categories-grid">
      <div
        class="category-card"
        v-for="(category, index) in categories"
        :key="index"
      >
        <span class="badge">{{ category.discount }} OFF</span>

        <h3>{{ category.name }}</h3>

        <p>{{ category.products }} Products</p>
      </div>
    </div>

    <button class="view-all-btn" @click="category">View All Categories</button>
  </section>
  <div class="best-sellers-container">
    <h1 class="section-heading">Best Sellers</h1>
    <div class="nav-links">
      <a href="/products" class="nav-sale">On Sale</a>

      <a href="/products" class="show-products">Show All Products</a>
    </div>

    <div class="product-grid">
      <div class="product-card" @click="goToProduct(products.id)">
        <div class="image-container">
          <img :src="products.image" :alt="products.title" />
          <span class="discount-badge">{{ products.discount }} OFF</span>
        </div>

        <div class="product-details">
          <h2 class="product-title">{{ products.title }}</h2>

          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">{{ products.rating }}</span>
          </div>

          <div class="price-container">
            <span class="current-price">{{ products.price }}</span>
            <span class="old-price">{{ products.oldprice }}</span>
          </div>

          <button class="add-to-cart-button" @click.stop="addToCart(products)">
            Add to Cart
          </button>
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
      products: {
        id: 1,
        title: "Traction Bed Pro X1",
        image: "https://via.placeholder.com/300",
        rating: 4.5,
        price: "Rs. 45,000",
        oldprice: "Rs. 55,000",
        discount: "20%",
      },
      brands: [
        { name: "BTL" },
        { name: "Enraf Nonius" },
        { name: "Dynatron" },
        { name: "Intelect" },
        { name: "Chattanooga" },
        { name: "Storz Medical" },
      ],
      activeCategory: 0,
      categories: [
        { name: "Traction Systems", discount: "40%", products: 24 },
        { name: "TENS/EMS Units", discount: "35%", products: 18 },
        { name: "Ultrasound Therapy", discount: "30%", products: 15 },
        { name: "Infra-Red Therapy", discount: "45%", products: 12 },
        { name: "Rehabilitation", discount: "38%", products: 28 },
        { name: "Sports Recovery", discount: "42%", products: 21 },
        { name: "Orthopedic Care", discount: "33%", products: 19 },
        { name: "Diagnostic Tools", discount: "25%", products: 14 },
      ],
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
};
</script>
<style>
.featured-categories {
  margin-top: 40px;
  padding: 0 20px;
}

.featured-categories h2 {
  font-weight: 700;
  font-size: 30px;
  color: #333;
  margin-top: 40px;
  text-align: left;
  margin: 0 auto;
  max-width: 1320px;
}

.categories-grid {
  padding: 20px 80px 30px 80px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.category-card {
  position: relative;
  background: #ffffff;
  border-radius: 14px;
  padding: 40px 20px;
  text-align: center;
  border: 1px solid #eeeeee;
  min-height: 170px;
}
.nav-links {
  background-color: white;
  max-width: 1320px;
  margin: 3px auto;
  
  display: flex;
  justify-content: space-between;
  height: 60px;
  border-radius: 2px;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.show-products {
  margin: 10px;
  text-decoration: none;
  color:  #7ed9b0;
  padding: 0.5rem 0.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid  #7ed9b0;
  border-radius: 10px;
}

.nav-sale {
  text-decoration: none;
  color:#6fc6f5 ;
  padding: 1rem 1rem;
  border: 1px solid transparent;
  transition: all 0.3s ease;
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
  background-color:#6fc6f5 ;
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
;
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
  padding: 0.5rem 0.5rem;
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
  transform:scaleX(1.01);
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
  color:  #6fc6f5;
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
  background-color:  #6fc6f5;
  color: white;
  border-color:  #6fc6f5;
  text-decoration: none;
}

.btn-primary:hover {
  background-color: #6fc6f5;
  border-color:  #6fc6f5;
  text-decoration:none;
  color:white;
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
  text-decoration:none;
}
/* Mobile phones */
@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
    padding: 10px;
    gap: 10px;
  }

  .category-card {
    padding: 30px 15px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    padding: 0 10px 20px 10px;
  }

  .product-card {
    margin-bottom: 20px;
  }

  .brands-container {
    flex-direction: column;
    padding: 0 10px;
  }

  .brand-card {
    flex-basis: 100%;
    margin-bottom: 10px;
  }

  .main-heading,
  .main-heading-s {
    font-size: 24px;
  }

  .sub-text,
  .sub-text-s {
    font-size: 13px;
  }

  .buttons-container,
  .buttons-group {
    flex-direction: column;
    gap: 10px;
  }

  .app-banner {
    padding: 20px 5%;
  }

  .daraz-link {
    font-size: 16px;
  }
}
</style>
