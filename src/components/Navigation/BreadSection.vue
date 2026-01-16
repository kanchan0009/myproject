<template>
  <div v-if="showBreadcrumbs" class="breadcrumbs-container">
    <div class="breadCrumbs">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Breadcrumbs',
  
  setup() {
    const route = useRoute()
    
    // Define breadcrumb names for each route
    const breadcrumbMap = {
      '/categories': 'Categories',
      '/products': 'Products',
      '/about': 'About Us',
      '/contact': 'Contact'
    }
    
    // Check if we should show breadcrumbs (not on homepage)
    const showBreadcrumbs = computed(() => {
      return route.path !== '/'
    })
    
    // Get current breadcrumb name
    const currentBreadcrumb = computed(() => {
      // Exact match
      if (breadcrumbMap[route.path]) {
        return breadcrumbMap[route.path]
      }
      
      // For nested routes like /categories/electronics
      const pathSegments = route.path.split('/')
      if (pathSegments.length > 1) {
        const basePath = `/${pathSegments[1]}`
        if (breadcrumbMap[basePath]) {
          return breadcrumbMap[basePath]
        }
      }
      
      // Fallback: format the path
      const pathName = route.path.replace('/', '')
      return pathName.charAt(0).toUpperCase() + pathName.slice(1)
    })
    
    return {
      showBreadcrumbs,
      currentBreadcrumb
      
    }
  }
}
</script>

<style scoped>
.breadcrumbs-container {
  background-color: #f8f9fa;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;
}

.breadcrumbs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #0f0f0f;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #2f2f2f;
  
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

/* Responsive */
@media (max-width: 768px) {
  .breadcrumbs {
    padding: 0 15px;
    font-size: 13px;
  }
  
  .breadcrumbs-container {
    padding: 10px 0;
  }
}
</style>