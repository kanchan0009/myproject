<template>
  <div class="product-categories">
    <div style="background: #7ed9b0; padding: 50px 40px">
      <div style="max-width: 1200px; margin: 0 auto">
        <h1
          style="
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: white;
          "
        >
          Product Categories
        </h1>

        <p style="margin: 0; font-size: 16px; color: white">
          Browse our comprehensive selection of physiotherapy equipment
        </p>
      </div>
    </div>
    <div class="category-container">
      <div class="category-card" v-for="(card, index) in cards" :key="index">
        <div class="category-image">
          <img :src="card.image" />
          <div class="count-badge">{{ card.count }}</div>
        </div>

        <div class="category-content">
          <div class="category-title">{{ card.title }}</div>
          <div class="category-desc">{{ card.desc }}</div>

          <button class="view-btn" @click.stop="viewProducts(card.link)">
            View Products
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <h2>Featured Brands</h2>
      <div class="brands">
        <div class="brand-card" v-for="brand in brands" :key="brand">
          {{ brand }}
        </div>
      </div>
    </div>
    <div class="contact-section">
      <h1>Can't find what you're looking for?</h1>
      <p>Contact our team for custom solutions and bulk orders</p>
      <button type="button" class="contact-button" @click="contact">
        Get in Touch
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import products from "@/data/products.json";

export default defineComponent({
  name: "CategoryCards",

  data() {
    // Get unique types
    const types = [...new Set(products.map((p) => p.type))];
    const cards = types.map((type) => {
      const typeProducts = products.filter((p) => p.type === type);
      const firstProduct = typeProducts[0];
      return {
        title: type,
        desc: `Equipment for ${type}`,
        image: "/assets/medical.jpeg",
        count: typeProducts.length,
        link: `/products?type=${type}`,
      };
    });

    // Get unique brands, first 4
    const brands = [...new Set(products.map((p) => p.brand))].slice(0, 4);

    return {
      cards,
      brands,
    };
  },

  methods: {
    viewProducts(link) {
      this.$router.push(link);
    },
  },
  setup() {
    const contact = () => {
      window.location.href = "/contact";
    };
    return {
      contact,
    };
  },
});
</script>

<style scoped>
.category-container {
  max-width: 1700px;
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0 20px;
}
.category-card:hover {
  transform: scale(1.02);
  transition: all 0.3s ease-in-out;
}

.category-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 320px;
}

.category-image {
  height: 180px;
  background: #f0f0f0;
  position: relative;
  flex-shrink: 0;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.count-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #62cd9d;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.category-content {
  padding: 20px;
}

.category-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.category-desc {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}

.extra-info {
  border-top: 1px solid #eee;
  padding-top: 12px;
  margin-bottom: 16px;
}

.extra-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.extra-info li {
  margin-bottom: 6px;
  font-size: 14px;
}

.view-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background: #6fc6f5;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-size: medium;
}
.container {
  padding: 48px 56px;
}

h2 {
  margin: 0 0 32px 0;
  font-size: 32px;
  font-weight: 700;
}

.brands {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.brand-card {
  background-color: #ffffff;
  border-radius: 14px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #e6e6e6;
}
.container {
  margin: auto;
  background-color: #fafbfc;
}
.contact-section {
  background: radial-gradient(
    circle at center,
    #6fc6f5 50%,
    #7ad9b0 80%,
    #7ed9b0 100%
  );

  width: 100%;

  padding: 80px 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 28px;
  color: white;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: white;
  margin-bottom: 25px;
}

.contact-button {
  background-color: #6fc6f5;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.1);

  outline: none;
  border: 1px solid white;

  margin: 0 auto;
  display: block;
}

.contact-button:hover {
  transform: scale(1.05);
  transition: all 0.2s ease-in-out;
  box-shadow: inset 0 3px 6px white, 0 3px 6px white;
}
@media (max-width: 768px) {
  .category-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .brands {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  .category-container {
    grid-template-columns: 1fr;
  }
  .brands {
    grid-template-columns: 1fr;
  }
  h1,
  h2 {
    font-size: 24px;
  }
  .category-title {
    font-size: 18px;
  }
  .category-desc {
    font-size: 13px;
  }
  .contact-section {
    padding: 50px 10px;
  }
  .contact-button {
    width: 100%;
    padding: 14px;
  }
}
</style>
