<template>
  <router-view />
</template>

<script>
import { provide, ref, onMounted } from "vue";
import api from "@/api/axios";

export default {
  setup() {
    const isAuthenticated = ref(false);

    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        isAuthenticated.value = true;
      } else {
        isAuthenticated.value = false;
      }
    };

    const login = (token) => {
      localStorage.setItem("authToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      isAuthenticated.value = true;
    };

    const logout = () => {
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
      isAuthenticated.value = false;
    };

    onMounted(checkAuth);

    provide("auth", {
      isAuthenticated,
      login,
      logout,
    });

    return {
      isAuthenticated,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  color: #000;
  overflow-x: hidden;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
a:hover {
  text-decoration: underline;
  color: #42b983;
}
</style>
