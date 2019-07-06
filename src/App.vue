<template>
  <div id="app">
    <Navigation />
    <router-view/>
    <BottomNav />
  </div>
</template>
<script>
import Navigation from "@/components/Navigation.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
  name: "home",
  components: {
    Navigation,
    BottomNav
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>