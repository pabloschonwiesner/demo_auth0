<template>
  <div id="app">
    <router-view/>
    <!-- <router-link v-if="$auth.isAuthenticated && $route.name != 'home'" to="/home">home</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'App',

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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.column { display: flex; flex-direction: column; }
.row { display: flex; flex-direction: row; }
.label { font-size: 12px;}

</style>
