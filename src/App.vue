<template>
  <nav>
    <router-link to="/"></router-link> 
    <router-link to="/about"></router-link>
    <router-link to="/contact"></router-link>
    <router-link to="/products"></router-link>
    <router-link to="/categories"></router-link>
  </nav>
  <router-view/>
</template>

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
}


nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
a:hover{
  text-decoration: underline;
  color:#42b983;
}

</style>
