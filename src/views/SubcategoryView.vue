<template>
  <div class="subcategory-view" v-if="products.length > 0">
    <ul class="product-list">
      <li v-for="product in products" :key="product.id" class="product-item">
        <router-link :to="`/productdetail/${product.id}`" class="product-link">
          {{ product.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SubcategoryView",
  props: {
    categoryName: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.subcategory-view {
  margin-left: 16px;
  width: 250px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  margin-bottom: 4px;
}

.product-link {
  display: block;
  padding: 8px 12px;
  color: #495057;
  text-decoration: none;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.2s ease;
  text-align: left;
}

.product-link:hover {
  background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1976d2;
  padding-left: 16px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .subcategory-view {
    position: static;
    width: 100%;
    margin-top: 8px;
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }
}
</style>
