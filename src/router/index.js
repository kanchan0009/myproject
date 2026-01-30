import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "/categories",
        name: "Categories",
        component: () => import("@/views/CategoryView.vue"),
      },
      // {
      //   path: "/categories/:categoryId",
      //   name: "CategoryDetail",
      //   component: () => import("@/views/CategoryView.vue"),
      //   props: true,
      // },
      {
        path: "/products",
        name: "Products",
        component: () => import("@/views/ProductView.vue"),
      },
      {
        path: "/productdetail/:productId",
        name: "ProductDetail",
        component: () => import("@/views/ProductDetail.vue"),
        props: true,
      },
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/AboutView.vue"),
      },
      {
        path: "/contact",
        name: "Contact",
        component: () => import("@/views/ContactView.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () => import("@/views/CartView.vue"),
      },
      {
        path: "/checkout",
        name: "Checkout",
        component: () => import("@/views/CheckoutView.vue"),
      },
      {
        path: "/payment",
        name: "Payment",
        component: () => import("@/views/PaymentMethod.vue"),
      },
      {
        path: "/wishlist",
        name: "Wishlist",
        component: () => import("@/views/WishlistView.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/RegisterView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
