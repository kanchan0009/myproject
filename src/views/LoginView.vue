<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- Username or Email -->
        <div class="form-group">
          <label for="username">Username or Email</label>
          <input type="text" id="username" v-model="username" required />
          <p v-if="errors.username" class="field-error">
            {{ errors.username }}
          </p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
          <p v-if="errors.password" class="field-error">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit -->
        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <!-- General Errors -->
      <p v-if="errors.general" class="error">{{ errors.general }}</p>

      <!-- Register Link -->
      <p class="register-link">
        Don't have an account?
        <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import api from "@/api/axios";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const router = useRouter();
    const auth = inject("auth");

    // Form fields
    const username = ref("");
    const password = ref("");

    // Loading and errors
    const loading = ref(false);
    const errors = ref({
      username: "",
      password: "",
      general: "",
    });

    const handleLogin = async () => {
      loading.value = true;
      errors.value = { username: "", password: "", general: "" };

      try {
        // Try username first
        let payload = {
          username: username.value,
          password: password.value,
        };

        let response = await api.post("/api/auth/login/", payload);

        // If username fails, try with email
        if (!response.data.token && response.status !== 200) {
          payload = {
            email: username.value,
            password: password.value,
          };
          response = await api.post("/api/auth/login/", payload);
        }

        // Check for successful login
        if (
          response.data.token ||
          response.data.key ||
          response.status === 200
        ) {
          const token = response.data.token || response.data.key;
          if (token) {
            localStorage.setItem("auth_token", token);
            // Update axios defaults for future requests
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
          }

          alert("Login successful!");
          router.push("/"); // redirect to home page
        } else {
          throw new Error("No token received");
        }
      } catch (err) {
        console.error("Login error:", err.response || err);

        // Handle different error types
        if (err.response?.status === 400) {
          errors.value.general =
            "Invalid username/email or password. Please check your credentials.";
        } else if (err.response?.status === 401) {
          errors.value.general = "Invalid credentials. Please try again.";
        } else if (err.response?.status === 403) {
          errors.value.general = "Account is disabled or access denied.";
        } else if (err.response?.status === 429) {
          errors.value.general =
            "Too many login attempts. Please try again later.";
        } else {
          const errorMsg =
            err.response?.data?.detail ||
            err.response?.data?.non_field_errors?.[0] ||
            err.response?.data?.error ||
            "Login failed. Please check your credentials and try again.";
          errors.value.general = errorMsg;
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      loading,
      errors,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.field-error {
  color: red;
  font-size: 0.9rem;
  margin-top: 2px;
}
.error {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #6fc6f5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover:not(:disabled) {
  background-color: #5bb8f5;
}

.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
