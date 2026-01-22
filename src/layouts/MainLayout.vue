<template>
  <div class="app-layout">
    <Navbar ref="navbarRef" />

    <CategorySection v-if="$route.name !== 'ProductDetail'" />

    <!-- Page Content -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- Footer -->
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Column 1: PhysioNepals Brand -->
        <div class="brand-column">
          <div class="logo">PhysioNepals</div>
          <p class="tagline">
            Premium physiotherapy equipment and rehabilitation products for
            professionals in Nepal.
          </p>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="links-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#" @click="categories">Categories</a></li>
            <li><a href="#" @click="products">Products</a></li>
            <li><a href="#" @click="about">About Us</a></li>
            <li><a href="#" @click="contact">Contact</a></li>
          </ul>
        </div>

        <!-- Column 3: Information -->
        <div class="links-column">
          <h3>Information</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact Us -->
        <div class="contact-column">
          <h3>Contact Us</h3>
          <div class="contact-info">
            <i class="fas fa-phone"></i>
            <span>+977-01-234567</span>
          </div>
          <div class="contact-info">
            <i class="fas fa-envelope"></i>
            <span>kiranthapa@physionepal.com.np</span>
          </div>
          <div class="contact-info">
            <i class="fas fa-map-marker-alt"></i>
            <span>Gaidakot - 04, Nawalparasi</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">© 2025 PhysioNepals. All rights reserved</div>
        <div class="legal-links">
          <a href="#"><i class="fa-brands fa-facebook-f fa-bounce"></i></a>
          <a href="#"><i class="fa-brands fa-instagram fa-bounce"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, ref } from "vue";
import Navbar from "@/components/NavSection.vue";
import CategorySection from "@/components/Navigation/CategorySection.vue";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    CategorySection,
  },
  setup() {
    const navbarRef = ref(null);

    const categories = () => {
      window.location.href = "/categories";
    };
    const products = () => {
      window.location.href = "/products";
    };
    const about = () => {
      window.location.href = "/about";
    };
    const contact = () => {
      window.location.href = "/contact";
    };

    // Provide addToCart method to child components
    const addToCart = (product, quantity = 1) => {
      // Get navbar component reference and call its addToCart method
      const navbar = navbarRef.value;
      if (navbar && navbar.addToCart) {
        navbar.addToCart(product, quantity);
      } else {
        console.warn("Navbar not available for addToCart");
      }
    };

    // Provide showToast method to child components
    const showToast = (message, type = "success") => {
      // Get navbar component reference and call its showToast method
      const navbar = navbarRef.value;
      if (navbar && navbar.showToast) {
        navbar.showToast(message, type);
      }
    };

    provide("addToCart", addToCart);
    provide("showToast", showToast);

    return {
      navbarRef,
      categories,
      products,
      about,
      contact,
      addToCart,
    };
  },
};
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.footer-container {
  width: 100%;
  background-color: white;
  padding: 40px 20px 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.brand-column .logo {
  font-size: 28px;
  font-weight: 700;
  color: #7ed9b0;
  margin-bottom: 15px;
}

.brand-column .tagline {
  color: black;
  line-height: 1.6;
  font-size: 15px;
}

.links-column h3 {
  font-size: 18px;
  color: #7ed9b0;
  margin-bottom: 20px;
}

.links-column ul {
  list-style: none;
}

.links-column ul li {
  margin-bottom: 12px;
}

.links-column ul li a {
  color: black;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 15px;
}

.links-column ul li a:hover {
  color: #7ed9b0;
}

/* Contact Column */
.contact-column h3 {
  font-size: 18px;
  color: #7ed9b0;
  margin-bottom: 20px;
  margin-right: 230px;
}

.contact-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  color: black;
  font-size: 15px;
}

.contact-info i {
  margin-right: 12px;
  color: rgb(50, 48, 48);
  font-size: 16px;
  width: 20px;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #95a5a6;
  font-size: 14px;
}

.legal-links {
  display: flex;
  gap: 10px;
  width: 100px;
}

.legal-links a {
  color: #95a5a6;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.legal-links a:hover {
  color: #6fc6f5;
}

/* Responsive Footer */
@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 30px;
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

/* Responsive Main Content */
@media (max-width: 768px) {
  .main-content {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 30px 15px 15px;
  }

  .footer-grid {
    gap: 25px;
  }

  .brand-column .logo {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .brand-column .tagline {
    font-size: 14px;
    line-height: 1.5;
  }

  .links-column h3 {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .links-column ul li {
    margin-bottom: 10px;
  }

  .links-column ul li a {
    font-size: 14px;
  }

  .contact-column h3 {
    font-size: 16px;
    margin-bottom: 15px;
    margin-right: 0;
  }

  .contact-info {
    margin-bottom: 12px;
    font-size: 14px;
  }

  .contact-info i {
    margin-right: 10px;
    font-size: 15px;
    width: 18px;
  }

  .footer-bottom {
    padding-top: 15px;
  }

  .copyright {
    font-size: 13px;
  }

  .legal-links {
    gap: 8px;
  }

  .legal-links a {
    font-size: 13px;
  }
}
</style>
