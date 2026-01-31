<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- Username -->
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            :class="{ 'error-input': errors.username }"
          />
          <p v-if="errors.username" class="field-error">
            {{ errors.username }}
          </p>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            :class="{ 'error-input': errors.password }"
          />
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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const router = useRouter();

    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const errors = ref({
      username: "",
      password: "",
      general: "",
    });

    const handleLogin = async () => {
      loading.value = true;
      errors.value = { username: "", password: "", general: "" };

      if (!username.value) {
        errors.value.username = "Username is required";
        loading.value = false;
        return;
      }
      if (!password.value) {
        errors.value.password = "Password is required";
        loading.value = false;
        return;
      }

      try {
        const response = await api.post("/api/auth/login/", {
          username: username.value, // <--- changed from email to username
          password: password.value,
        });

        const token = response.data.token;

        // Save token and set axios header
        localStorage.setItem("authToken", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        // Redirect after login
        router.push("/");
      } catch (err) {
        console.error("Login error:", err.response || err);
        errors.value.general =
          err.response?.status === 401 || err.response?.status === 400
            ? "Invalid username or password."
            : "Login failed. Please try again.";
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
  text-align: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
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
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}
.form-group input:focus {
  outline: none;
  border-color: #6fc6f5;
}
.form-group input.error-input {
  border-color: red;
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
  margin-top: 1rem;
}
.login-btn:hover:not(:disabled) {
  background-color: #5bb8f5;
}
.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}
.register-link a {
  color: #6fc6f5;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}
</style>
