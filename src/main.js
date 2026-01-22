import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)

// Global cart state
const cartState = reactive({
  items: [],
  addToCart(product, quantity = 1) {
    const existingItemIndex = cartState.items.findIndex(
      (item) => item.id === product.id,
    );
    if (existingItemIndex > -1) {
      cartState.items[existingItemIndex].quantity += quantity;
    } else {
      cartState.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images
          ? product.images[0]
          : '/assets/medical.jpeg',
        quantity: quantity,
      });
    }
  },
  showToast(message, type = "success") {
    // This will be set by the navbar component
    if (cartState.toastFunction) {
      cartState.toastFunction(message, type);
    }
  },
  setToastFunction(func) {
    cartState.toastFunction = func;
  },
});

// Provide global cart state
app.provide('cartState', cartState);

app.mount('#app')
