<template>
  <div class="product">
    <div style="background: #f6fbfa; padding: 50px 40px">
      <div style="max-width: 1200px; margin: 0 auto">
        <h1
          style="
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: #000000;
          "
        >
          Products
        </h1>

        <p style="margin: 0; font-size: 16px; color: #555555">
          Showing 11 of 11 products
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
      <aside style="width: 280px">
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
        <div
          style="
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          "
        >
          <div style="font-weight: 600; margin-bottom: 15px">Price Range</div>
          <input
            v-model="maxPrice"
            @input="applyFilters"
            type="range"
            min="0"
            max="100000"
            style="width: 100%"
          />
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              font-size: 14px;
            "
          >
            <span>Min<br /><b>NPR 0</b></span>
            <span>Max<br /><b>NPR 100,000</b></span>
          </div>
        </div>

        <!-- Brand -->
        <div
          style="
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          "
        >
          <!-- Title -->
          <div style="font-weight: 600; margin-bottom: 12px">Brand</div>

          <!-- Brand List -->
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

        <!-- Type (Scrollable) -->
        <div
          style="
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
          "
        >
          <!-- Title -->
          <div style="font-weight: 600; margin-bottom: 12px">Type</div>

          <!-- Scrollable List -->
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

      <!-- PRODUCTS GRID -->
    <div style="flex:1; display:grid; grid-template-columns:repeat(3,1fr); gap:30px;">
      <div v-for="product in filteredProducts"
           :key="product.id"
           style="border:1px solid #ddd; border-radius:12px;">

        <div style="background:#eee;height:180px;"></div>

        <div style="padding:15px;">
          <div style="color:#1f8f3a;">{{ product.brand }}</div>
          <b>{{ product.name }}</b>

          <div style="color:#1f8f3a;font-weight:bold;">
            NPR {{ product.price.toLocaleString() }}
          </div>

          <div style="display:flex; gap:10px; margin-top:10px;">
            <button style="flex:1;background:#1f8f3a;color:#fff;border:none;padding:8px;border-radius:8px;">
              <i class="fa-solid fa-cart-shopping"></i>
              Add
            </button>
            <button style="width:40px;border-radius:8px;">👁</button>
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
      maxPrice: 100000,

      brands: ["Dynatron", "Enraf-Nonius", "Physiomed", "Chattanooga", "BTL", "Zimmer"],
      types: ["Ultrasound", "TENS", "Traction" ,"Heat Therapy", "Balance", "Support", "Massage", "Accessories"],



      selectedBrands: [],
      selectedTypes: [],

      products: [
        {
          id: 1,
          brand: "Dynatron",
          type: "Traction",
          name: "Advanced Traction Machine",
          price: 85000
        },
        {
          id: 2,
          brand: "Enraf-Nonius",
          type: "Ultrasound",
          name: "Ultrasound Therapy Device",
          price: 45000
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        },
        {
          id: 3,
          brand: "Physiomed",
          type: "TENS",
          name: "Muscle Stimulator TENS",
          price: 12500
        }
        // add up to 11 products here
      ]
    };
  },

  computed: {
    filteredProducts() {
      let result = this.products.filter(p => {
        const brandMatch =
          this.selectedBrands.length === 0 ||
          this.selectedBrands.includes(p.brand);

        const typeMatch =
          this.selectedTypes.length === 0 ||
          this.selectedTypes.includes(p.type);

        const priceMatch = p.price <= this.maxPrice;

        return brandMatch && typeMatch && priceMatch;
      });

      if (this.sortOption === "low") {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortOption === "high" || this.sortOption === "highest") {
        result.sort((a, b) => b.price - a.price);
      }

      return result;
    }
  },

  methods: {
    applyFilters() {
  
    }
  }
};
</script>
