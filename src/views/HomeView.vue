<template>
  <div style="border-bottom: 0.8px solid grey">
    <div
      style="
        width: 100%;
        min-height: 480px;
        background: linear-gradient(90deg, #1f9d3a, #4fb26b);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 60px 80px;
      "
    >
      <!-- LEFT CONTENT -->
      <div style="max-width: 600px; color: #ffffff">
        <h1
          style="
            font-size: 48px;
            line-height: 1.2;
            margin: 0 0 20px 0;
            font-weight: 700;
          "
        >
          Professional<br />Physiotherapy Equipment
        </h1>

        <p style="font-size: 18px; line-height: 1.6; margin: 0 0 30px 0">
          Premium equipment from trusted brands. Direct from manufacturers.<br />
          Lowest prices guaranteed.
        </p>

        <button
          style="
            background: #ffffff;
            color: #1f9d3a;
            border: none;
            padding: 14px 36px;
            font-size: 16px;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
          "
          @click="products"
        >
          Shop Now
        </button>
      </div>

      <!-- RIGHT CONTENT -->
      <div style="color: #ffffff; text-align: center">
        <div style="font-size: 24px; font-weight: 600">UPTO</div>
        <div style="font-size: 90px; font-weight: 800; line-height: 1">50%</div>
        <div style="font-size: 22px; font-weight: 500">OFF</div>
      </div>
    </div>

    <!-- FEATURES BAR -->
    <div
      style="
        width: 100%;
        background: #ffffff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 30px 60px;
        box-sizing: border-box;
        border-top: 1px solid #eaeaea;
      "
    >
      <div style="text-align: center">
        <div style="font-size: 18px; font-weight: 600">✔ Genuine Products</div>
        <div style="font-size: 14px; color: #555; margin-top: 6px">
          Sourced directly from brands
        </div>
      </div>

      <div style="text-align: center">
        <div style="font-size: 18px; font-weight: 600">✔ 1500+ Brands</div>
        <div style="font-size: 14px; color: #555; margin-top: 6px">
          Curated selection
        </div>
      </div>

      <div style="text-align: center">
        <div style="font-size: 18px; font-weight: 600">✔ Safe Payments</div>
        <div style="font-size: 14px; color: #555; margin-top: 6px">
          Secure transactions
        </div>
      </div>

      <div style="text-align: center">
        <div style="font-size: 18px; font-weight: 600">✔ Fast Delivery</div>
        <div style="font-size: 14px; color: #555; margin-top: 6px">
          Across Nepal
        </div>
      </div>
    </div>
  </div>

  <section class="featured-categories">
    <h2>Featured Categories</h2>

    <div class="categories-grid">
      <div class="category-card">
        <span class="badge">40% OFF</span>
        <h3 class="active">Traction Systems</h3>
        <p>24 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">35% OFF</span>
        <h3>TENS/EMS Units</h3>
        <p>18 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">30% OFF</span>
        <h3>Ultrasound Therapy</h3>
        <p>15 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">45% OFF</span>
        <h3>Infra-Red Therapy</h3>
        <p>12 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">38% OFF</span>
        <h3>Rehabilitation</h3>
        <p>28 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">42% OFF</span>
        <h3>Sports Recovery</h3>
        <p>21 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">33% OFF</span>
        <h3>Orthopedic Care</h3>
        <p>19 Products</p>
      </div>

      <div class="category-card">
        <span class="badge">25% OFF</span>
        <h3>Diagnostic Tools</h3>
        <p>14 Products</p>
      </div>
    </div>

    <button class="view-all-btn" @click="categories">
      View All Categories
    </button>
  </section>
  <div class="best-sellers-container">
    <!-- Heading Aligned Left -->
    <h1 class="section-heading">Best Sellers</h1>

    <!-- Product Grid Container -->
    <div class="product-grid">
      <!-- Product Card 1 -->
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Traction Bed Pro X1" />
          <span class="discount-badge">40% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Traction Bed Pro X1</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.8</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 45,000</span>
            <span class="old-price">NPR 75,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      <!-- Product Card 2 -->
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="TENS Machine Ultra" />
          <span class="discount-badge">38% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">TENS Machine Ultra</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.7</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 8,500</span>
            <span class="old-price">NPR 13,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      <!-- Product Card 3 -->
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Ultrasound Device" />
          <span class="discount-badge">33% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Ultrasound Device</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.9</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 28,000</span>
            <span class="old-price">NPR 42,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      <!-- Product Card 4 -->
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Infra-Red Lamp" />
          <span class="discount-badge">38% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Infra-Red Lamp</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.6</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 5,200</span>
            <span class="old-price">NPR 6,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Infra-Red Lamp" />
          <span class="discount-badge">38% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Infra-Red Lamp</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.6</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 5,200</span>
            <span class="old-price">NPR 6,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Infra-Red Lamp" />
          <span class="discount-badge">38% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Infra-Red Lamp</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.6</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 5,200</span>
            <span class="old-price">NPR 6,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Infra-Red Lamp" />
          <span class="discount-badge">38% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Infra-Red Lamp</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.6</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 5,200</span>
            <span class="old-price">NPR 6,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
      <div class="product-card">
        <div class="image-container">
          <!-- Placeholder image URL -->
          <img src="https://via.placeholder.com" alt="Infra-Red Lamp" />
          <span class="discount-badge">38% OFF</span>
        </div>
        <div class="product-details">
          <h2 class="product-title">Infra-Red Lamp</h2>
          <div class="rating">
            <span class="star">⭐</span>
            <span class="rating-value">4.6</span>
          </div>
          <div class="price-container">
            <span class="current-price">NPR 5,200</span>
            <span class="old-price">NPR 6,000</span>
          </div>
          <button class="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
  <div class="brands-section">
    <h1 class="section-title">Trusted Brands</h1>

    <div class="brands-container">
      <div class="brand-card">BTL</div>
      <div class="brand-card">Enraf Nonius</div>
      <div class="brand-card">Dynatron</div>
      <div class="brand-card">Intelect</div>
      <div class="brand-card">Chattanooga</div>
      <div class="brand-card">Storz Medical</div>
    </div>
  </div>
  <div class="app-banner">
    <div class="content-left">
      <h1 class="main-heading">Shop on the Go</h1>
      <p class="sub-text">
        Download our mobile app for exclusive deals and faster checkout
      </p>
      <div class="buttons-container">
        <!-- Use the 'to' attribute with the path '/' -->
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
      <!-- Using a span for the arrow icon visually -->
      <a class="btn btn-secondary" href="https://www.daraz.com.np/"
        >Visit on Daraz<span>&rarr;</span></a
      >
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const categories = () => {
      window.location.href = "/categories";
    };
    const products = () => {
      window.location.href = "/products";
    };
    return {
      categories,
      products,
    };
  },
};
</script>
<style >
.featured-categories {
  margin-top: 80px;
  padding: 0 20px;
}

.featured-categories h2 {
  margin-top: 20px;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
}

.categories-grid {
  padding: 30px 80px 30px 80px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
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
  background-color: #1f9d45;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
}

.view-all-btn {
  display: block;
  margin: 40px auto 0;
  background-color: #1f9d45;
  color: #ffffff;
  border: none;
  padding: 14px 36px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
}
.best-sellers-container {
  background: rgb(239, 238, 238);
  padding: 20px;
  max-width: 100%;
  margin-top: 80px;
}

.section-heading {
  font-weight: 700;
  font-size: 30px;
  color: #333;
  margin-top: 40px;
  text-align: left; /* Ensures heading aligns left within the container */
}

.product-grid {
  padding: 30px 80px 30px 80px;
  display: grid;
  /* This creates 4 columns of equal width for the 4x4 layout requirement */
  grid-template-columns: repeat(4, 1fr);
  gap: 20px; /* Space between the cards */
}

.product-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Ensures image corners match card corners */
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
  object-fit: cover; /* Ensures the image covers the container nicely */
  display: block;
}
.product-card:hover {
  transform: scale(1.01);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #388e3c; /* Green background */
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.product-details {
  padding: 15px;
  flex-grow: 1; /* Allows details section to fill remaining space */
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
  color: #ffb700; /* Yellow color for the star icon */
  margin-right: 5px;
}

.rating-value {
  font-size: 14px;
  color: #666;
}

.price-container {
  margin-top: auto; /* Pushes prices to bottom before button */
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
  text-decoration: line-through; /* Strikethrough style */
}

.add-to-cart-button {
  width: 100%;
  background-color: #4caf50; /* Green button background */
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
  background-color: #45a049;
}
.brands-section {
  padding: 60px 20px; /* Vertical spacing around the section */
  text-align: center;
  /* Centers the heading and the container below it */
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50; /* Dark text color */
  margin-bottom: 30px; /* Space below the heading */
}

.brands-container {
  display: flex;
  justify-content: center; /* Evenly spaces the cards in the center */
  gap: 20px; /* Space between the cards */
  max-width: 1700px;
  margin: 0 auto;
  padding: 0px 60px 0px 60px;
}

.brand-card {
  background-color: #f8f9fa; /* Lighter background for the cards */
  padding: 20px;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); /* Subtle shadow effect */
  flex: 1; /* Ensures all 6 cards take equal space */
  color: #6c757d; /* Text color */
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
}
.brand-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
  transform: translateY(-4px); /* Slight lift effect */
  transition: all 0.3s ease;
}

/* Responsive adjustment if needed for smaller screens */
@media (max-width: 768px) {
  .brands-container {
    flex-wrap: wrap; /* Allows cards to wrap onto new lines if necessary */
  }
  .brand-card {
    flex-basis: calc(50% - 20px); /* 2 cards per row on mobile */
    margin-bottom: 10px;
  }
}
.app-banner {
  /* The blue gradient background color from the image */
  background: linear-gradient(to right, #005f99, #007bb6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 10%; /* General padding and width control */
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
  color:white;
}

.buttons-container {
  display: flex;
  gap: 15px; /* Space between the two buttons */
}

.app-button {
  text-decoration: none;
  background-color: white;
  color: #005f99; /* Button text color */
  border: none;
  border-radius: 4px;
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* Hover effect: make the button color darker */
.app-button:hover {
  background-color: #f0f0f0; /* Slightly darker/off-white background */
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
  text-decoration: none; /* Initially no underline */
  transition: text-decoration 0.3s;
}

/* Hover effect: underline should appear */
.daraz-link:hover {
  text-decoration: underline;
}
.banner-section {
  padding: 80px 20px;
  text-align: center; /* Centers all content horizontally */
  max-width: 800px;
  margin: 0 auto;
}

.main-heading-s{
  font-size: 36px;
  font-weight: bold;
  color:black; /* Dark text color */
  margin-bottom: 20px;
}

.sub-text-s {
  font-size: 16px;
  color: black; /* Gray text color */
  margin-bottom: 30px;
  line-height: 1.5;
}

.buttons-group {
  display: flex;
  justify-content: center; /* Centers the button group */
  gap: 15px; /* Space between buttons */
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

/* Primary Button (Blue) */
.btn-primary {
  background-color: #006699; /* Blue background color from image */
  color: white;
  border-color: #006699;
  text-decoration: none;
}

/* Hover effect for Primary Button: slightly darker blue */
.btn-primary:hover {
  background-color: #00507a;
  border-color: #00507a;
}

/* Secondary Button (Green Outline) */
.btn-secondary {
  background-color: transparent;
  color: #388e3c; /* Green text color from image */
  border-color: #388e3c; /* Green border color from image */
}

.btn-secondary span {
  margin-left: 8px; /* Space between "Daraz" text and the arrow */
}

/* Hover effect for Secondary Button: green background, white text */
.btn-secondary:hover {
  background-color: #388e3c;
  color: white;
}
</style>
