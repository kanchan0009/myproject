<template>
  <div v-if="showBreadcrumbs" class="breadcrumbs-container">
    <div class="breadcrumbs">
      <span class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">Home</router-link>
        <span class="separator">></span>
        <span class="breadcrumb-item current">
          {{ currentBreadcrumb }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Breadcrumbs",

  setup() {
    const route = useRoute();

    const breadcrumbMap = {
      "/categories": "Categories",
      "/products": "Products",
      "/about": "About Us",
      "/contact": "Contact",
    };

    const showBreadcrumbs = computed(() => route.path !== "/");

    const currentBreadcrumb = computed(() => {
      if (breadcrumbMap[route.path]) return breadcrumbMap[route.path];

      // Handle nested routes like /categories/electronics
      const pathSegments = route.path.split("/");
      if (pathSegments.length > 1) {
        const basePath = `/${pathSegments[1]}`;
        if (breadcrumbMap[basePath]) return breadcrumbMap[basePath];
      }

      const pathName = route.path.replace("/", "");
      return pathName.charAt(0).toUpperCase() + pathName.slice(1);
    });

    return { showBreadcrumbs, currentBreadcrumb };
  },
};
</script>

<style scoped>
.breadcrumbs-container {
  background-color: #f8f9fa;
  padding: 12px 100px;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumbs {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* allows better wrapping on small screens */
}

.breadcrumb-link {
  color: #6fc6f5;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #4da6e0;
}

.separator {
  margin: 0 10px;
  color: #999;
  font-weight: 300;
}

.current {
  color: #2c3e50;
  font-weight: 600;
}

/* ========================
   MOBILE RESPONSIVE
======================== */
@media (max-width: 1024px) {
  .breadcrumbs-container {
    padding: 10px 50px;
  }
  .breadcrumbs {
    font-size: 13px;
  }
  .separator {
    margin: 0 8px;
  }
}

@media (max-width: 768px) {
  .breadcrumbs-container {
    padding: 8px 20px;
  }
  .breadcrumbs {
    font-size: 12px;
  }
  .separator {
    margin: 0 5px;
  }
  .breadcrumb-item {
    flex-wrap: wrap;
  }
}
</style>
