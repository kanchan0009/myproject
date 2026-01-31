<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <!-- First Name -->
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            required
            :class="{ 'error-input': errors.firstName }"
          />
          <p v-if="errors.firstName" class="field-error">
            {{ errors.firstName }}
          </p>
        </div>

        <!-- Last Name -->
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            required
            :class="{ 'error-input': errors.lastName }"
          />
          <p v-if="errors.lastName" class="field-error">
            {{ errors.lastName }}
          </p>
        </div>

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
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
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

        <!-- Phone -->
        <div class="form-group">
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            v-model="phone"
            required
            :class="{ 'error-input': errors.phone }"
          />
          <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
        </div>

        <!-- Address -->
        <div class="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            required
            :class="{ 'error-input': errors.address }"
          />
          <p v-if="errors.address" class="field-error">{{ errors.address }}</p>
        </div>

        <!-- City -->
        <div class="form-group">
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            v-model="city"
            required
            :class="{ 'error-input': errors.city }"
          />
          <p v-if="errors.city" class="field-error">{{ errors.city }}</p>
        </div>

        <!-- State -->
        <div class="form-group">
          <label for="state">State</label>
          <input
            type="text"
            id="state"
            v-model="state"
            required
            :class="{ 'error-input': errors.state }"
          />
          <p v-if="errors.state" class="field-error">{{ errors.state }}</p>
        </div>

        <!-- Postal Code -->
        <div class="form-group">
          <label for="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            v-model="postalCode"
            required
            :class="{ 'error-input': errors.postalCode }"
          />
          <p v-if="errors.postalCode" class="field-error">
            {{ errors.postalCode }}
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
    const firstName = ref("");
    const lastName = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const phone = ref("");
    const address = ref("");
    const city = ref("");
    const state = ref("");
    const postalCode = ref("");

    // Loading and errors
    const loading = ref(false);
    const errors = ref({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      general: "",
    });

    const validateForm = () => {
      errors.value = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        general: "",
      };

      let isValid = true;

      if (!firstName.value) {
        errors.value.firstName = "First name is required";
        isValid = false;
      }
      if (!lastName.value) {
        errors.value.lastName = "Last name is required";
        isValid = false;
      }
      if (username.value.length < 3) {
        errors.value.username = "Username must be at least 3 characters long";
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        errors.value.email = "Please enter a valid email address";
        isValid = false;
      }

      if (password.value.length < 6) {
        errors.value.password = "Password must be at least 6 characters long";
        isValid = false;
      }

      if (password.value !== confirmPassword.value) {
        errors.value.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      if (!phone.value) {
        errors.value.phone = "Phone is required";
        isValid = false;
      }
      if (!address.value) {
        errors.value.address = "Address is required";
        isValid = false;
      }
      if (!city.value) {
        errors.value.city = "City is required";
        isValid = false;
      }
      if (!state.value) {
        errors.value.state = "State is required";
        isValid = false;
      }
      if (!postalCode.value) {
        errors.value.postalCode = "Postal code is required";
        isValid = false;
      }

      return isValid;
    };

    const handleRegister = async () => {
      if (!validateForm()) return;

      loading.value = true;
      errors.value.general = "";

      try {
        const payload = {
          username: email.value,
          email: email.value,
          password: password.value,
          first_name: firstName.value,
          last_name: lastName.value,
          phone: phone.value,
          address: address.value,
          city: city.value,
          state: state.value,
          postal_code: postalCode.value,
        };

        const response = await api.post("/api/auth/register/", payload);

        if (response.status === 201 || response.status === 200) {
          alert("Registration successful! Please log in.");
          router.push("/login");
        }
      } catch (err) {
        console.error("Registration error:", err.response || err);

        if (err.response?.status === 400) {
          const data = err.response.data;
          Object.keys(data).forEach((key) => {
            if (errors.value[key] !== undefined) {
              errors.value[key] = Array.isArray(data[key])
                ? data[key][0]
                : data[key];
            } else {
              errors.value.general = data[key];
            }
          });
        } else {
          errors.value.general =
            err.response?.data?.detail ||
            "Registration failed. Please check your input.";
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
      state,
      postalCode,
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
  text-align: center;
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
