<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
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

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            :class="{ 'error-input': errors.email }"
          />
          <p v-if="errors.email" class="field-error">
            {{ errors.email }}
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

        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            :class="{ 'error-input': errors.confirmPassword }"
          />
          <p v-if="errors.confirmPassword" class="field-error">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Submit -->
        <button type="submit" :disabled="loading" class="register-btn">
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <!-- General Errors -->
      <p v-if="errors.general" class="error">{{ errors.general }}</p>

      <!-- Login Link -->
      <p class="login-link">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from "@/api/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RegisterView",
  setup() {
    const router = useRouter();

    // Form fields
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    // Loading and errors
    const loading = ref(false);
    const errors = ref({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    });

    const validateForm = () => {
      errors.value = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: "",
      };

      let isValid = true;

      // Username validation
      if (username.value.length < 3) {
        errors.value.username = "Username must be at least 3 characters long";
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        errors.value.email = "Please enter a valid email address";
        isValid = false;
      }

      // Password validation
      if (password.value.length < 6) {
        errors.value.password = "Password must be at least 6 characters long";
        isValid = false;
      }

      // Confirm password validation
      if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      return isValid;
    };

    const handleRegister = async () => {
      if (!validateForm()) {
        return;
      }

      loading.value = true;
      errors.value.general = "";

      try {
        const payload = {
          username: username.value,
          email: email.value,
          password: password.value,
        };

        console.log("Registration payload:", payload);

        const response = await api.post("/api/customers/", payload);

        console.log("Registration response:", response);

        if (response.status === 201 || response.status === 200) {
          alert("Registration successful! Please login with your credentials.");
          router.push("/login");
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (err) {
        console.error("Registration error:", err.response || err);

        // Handle different error types
        if (err.response?.status === 400) {
          // Handle field-specific errors
          const data = err.response.data;
          if (data.username) {
            errors.value.username = Array.isArray(data.username)
              ? data.username[0]
              : data.username;
          }
          if (data.email) {
            errors.value.email = Array.isArray(data.email)
              ? data.email[0]
              : data.email;
          }
          if (data.password) {
            errors.value.password = Array.isArray(data.password)
              ? data.password[0]
              : data.password;
          }
          if (
            !errors.value.username &&
            !errors.value.email &&
            !errors.value.password
          ) {
            errors.value.general = "Please check your input and try again.";
          }
        } else if (err.response?.status === 409) {
          errors.value.general =
            "User with this email or username already exists.";
        } else if (err.response?.status === 500) {
          errors.value.general = "Server error. Please try again later.";
        } else {
          const errorMsg =
            err.response?.data?.detail ||
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Registration failed. Please try again.";
          errors.value.general = errorMsg;
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      loading,
      errors,
      handleRegister,
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

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.register-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.register-form h2 {
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

.register-btn {
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

.register-btn:hover:not(:disabled) {
  background-color: #5bb8f5;
}

.register-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.login-link a {
  color: #6fc6f5;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 480px) {
  .register-container {
    padding: 10px;
  }

  .register-form {
    padding: 1.5rem;
  }
}
</style>
