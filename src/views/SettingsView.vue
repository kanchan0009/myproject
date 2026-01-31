<template>
  <div class="settings-container">
    <h1>Settings</h1>
    <p>Manage your account settings here.</p>

    
    <div v-if="loading">Loading settings...</div>

   
    <div v-if="error" class="error">{{ error }}</div>

    
    <div v-if="settings && !loading">
      <div class="setting-item">
        <strong>Full Name:</strong> {{ settings.full_name }}
      </div>
      <div class="setting-item">
        <strong>Email:</strong> {{ settings.email }}
      </div>
      <div class="setting-item">
        <strong>Phone:</strong> {{ settings.phone }}
      </div>
      <div class="setting-item">
        <strong>Address:</strong> {{ settings.address }}
      </div>

      <button @click="navigateToEdit" class="edit-btn">Edit Settings</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "SettingsView",
  setup() {
    const router = useRouter();
    const settings = ref(null);
    const loading = ref(true);
    const error = ref("");

    const fetchSettings = async () => {
      loading.value = true;
      error.value = "";
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/api/settings/", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
        settings.value = response.data;
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        error.value = "Failed to load settings. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    const navigateToEdit = () => {
      router.push("/settings/edit"); // Replace with your actual edit route
    };

    onMounted(() => {
      fetchSettings();
    });

    return {
      settings,
      loading,
      error,
      navigateToEdit,
    };
  },
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-container h1 {
  color: #333;
  margin-bottom: 20px;
}

.settings-container p {
  color: #666;
  margin-bottom: 20px;
}

.setting-item {
  margin-bottom: 10px;
}

.edit-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-bottom: 10px;
}
</style>
