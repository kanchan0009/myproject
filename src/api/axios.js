import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // 🔥 REQUIRED for Django sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// CSRF helper
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

api.interceptors.request.use((config) => {
  const csrftoken = getCookie("csrftoken");
  if (csrftoken) {
    config.headers["X-CSRFToken"] = csrftoken;
  }

  // Add auth token if available, but not for login endpoint
  const authToken = localStorage.getItem("auth_token");
  if (authToken && !config.url.includes("/api/auth/login/")) {
    config.headers["Authorization"] = `Token ${authToken}`;
  }

  return config;
});

export default api;
