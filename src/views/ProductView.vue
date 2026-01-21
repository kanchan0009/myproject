<template>
  <div class="product">
    <!-- Header Section -->
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
          Products
        </h1>
        <p style="margin: 0; font-size: 16px; color: white">
          Showing {{ products.length }} of {{ products.length }} products
        </p>
      </div>
    </div>

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
          <div v-for="brand in brands" :key="brand" style="margin-bottom: 8px">
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

      <!-- Products Grid -->
      <div class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.images[0]" alt="" />
          </div>

          <div class="product-details">
            <div class="product-brand">{{ product.brand }}</div>
            <b class="product-name">{{ product.name }}</b>
            <div class="product-price">
              NPR {{ product.price.toLocaleString() }}
            </div>

            <div class="product-actions">
              <button class="add-button">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortOption: "featured",
      minPrice: 0,
      maxPrice: 100000,
      selectedBrands: [],
      selectedTypes: [],
      brands: [
        "Dynatron",
        "Enraf-Nonius",
        "Physiomed",
        "Chattanooga",
        "BTL",
        "Zimmer",
      ],
      types: [
        "Ultrasound",
        "TENS",
        "Traction",
        "Heat Therapy",
        "Balance",
        "Support",
        "Massage",
        "Accessories",
      ],

      products: [
        {
          id: 1,
          name: "Advanced Traction Machine",
          brand: "Dynatron",
          description:
            "High-end spinal decompression therapy system with digital controls",
          price: 85000,
          type: "Traction",
          inStock: true,
          rating: 4.8,
          reviews: 24,
          images: [
            "/images/traction-machine/main.jpg",
            "/images/traction-machine/1.jpg",
            "/images/traction-machine/2.jpg",
          ],
          features: [
            "Digital control system",
            "Spinal decompression therapy",
            "Clinic-grade equipment",
          ],
        },
        {
          id: 2,
          name: "Ultrasound Therapy",
          brand: "Enraf-Nonius",
          description: "Advanced ultrasound therapy device for pain relief",
          price: 45000,
          type: "Ultrasound",
          inStock: true,
          rating: 4.6,
          reviews: 18,
          images: ["/images/ultrasound/main.jpg"],
          features: ["Pain relief", "Deep tissue therapy"],
        },
        {
          id: 3,
          name: "Muscle Stimulator",
          brand: "Physiomed",
          description: "Advanced electrotherapy device for muscle stimulation",
          price: 38000,
          type: "TENS",
          inStock: true,
          rating: 4.5,
          reviews: 15,
          images: ["/images/muscle-stimulator/main.jpg"],
          features: ["Electrotherapy", "Muscle recovery"],
        },
        {
          id: 4,
          name: "Balance Board",
          brand: "Chattanooga",
          description:
            "Professional-grade balance board designed for rehabilitation and physical therapy",
          price: 12000,
          type: "Balance",
          inStock: true,
          rating: 4.4,
          reviews: 10,
          images: ["/images/balance-board/main.jpg"],
          features: ["Balance training", "Rehabilitation"],
        },
        {
          id: 5,
          name: "IRR Lamp with Stand",
          brand: "BTL",
          description: "Infrared Radiation Therapy Lamp with adjustable stand",
          price: 18500,
          type: "Heat Therapy",
          inStock: true,
          rating: 4.3,
          reviews: 12,
          images: ["/images/irr-lamp/main.jpg"],
          features: ["Infrared therapy", "Adjustable stand"],
        },
        {
          id: 6,
          name: "Traction Bed",
          brand: "Zimmer",
          description: "Advanced traction bed for physiotherapy",
          price: 95000,
          type: "Traction",
          inStock: true,
          rating: 4.7,
          reviews: 20,
          images: ["/images/traction-bed/main.jpg"],
          features: ["Physiotherapy bed", "Heavy-duty build"],
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

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
  },
  methods: {
    applyFilters() {
      // Trigger computed reactivity
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
.products-grid {
  flex: 0.9;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
} 
.product-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  text-align:left;
}
.product-card:hover {
  transform: scaleX(1.01);
  transition: all 0.2s ease-in;
  box-shadow: 2px 2px 2px rgb(247, 245, 245);
} 
.product-image {
  background: #eee;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
} 
.product-details {
  padding: 15px;
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
  display:flex;
  align-items: center;
  justify-content:center;
  color:black;
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
    padding: 0 10px;
  }

  aside {
    padding: 15px;
  }

  .product-image {
    height: 150px;
  }

  .product-details {
    padding: 8px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-price {
    font-size: 14px;
  }

  .product-actions {
    gap: 5px;
  }

  .add-button,
  .view-button {
    font-size: 14px;
    padding: 6px;
  }

  select,
  input[type="range"] {
    width: 100%;
  }
}
</style>
