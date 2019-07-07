<template>
    <div id="nav">
      <nav class="navbar is-transparent" v-bind:class="{'is-fixed-bottom':menuPosition}">
        <div class="navbar-brand">
          <div style="height: 80px;">
            <router-link class="navbar-item" to="/">
              <svg width="100%" height="100%" viewBox="0 0 600 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g transform="matrix(0.892826,0,0,0.892826,-87.0311,38.4465)"><text x="127.181px" y="149.385px" style="font-family:'Phi-Caps-Thin-Condensed', 'Phi Caps Thin Condensed';font-weight:100;font-stretch:condensed;font-size:150px;">ELLE <tspan x="421.102px 482.479px 540.926px 609.774px 676.425px " y="149.385px 149.385px 149.385px 149.385px 149.385px ">TRADE</tspan></text></g></svg>
            </router-link>
          </div>
          <div class="navbar-burger burger " v-bind:class="{ 'is-active': menuActive }" v-on:click="menuToggle()" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu" v-bind:class="{ 'is-active': menuActive }">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/">Home</router-link>
            <router-link class="navbar-item" to="/about">About</router-link>
          </div>
          <div class="navbar-end">
            <Authentication />
          </div>
        </div>
      </nav>
    </div>
</template>
<script>
import Authentication from "@/components/Authentication.vue";
export default {
  name: "navigation",
  components: {
    Authentication
  },
  created() {
    if (window.innerWidth < 920) {
      this.menuPosition = !this.menuPosition;
    }
  },
  data() {
    return {
      menuActive: false,
      menuPosition: false
    };
  },
  methods: {
    menuToggle() {
      this.menuActive = !this.menuActive;
    }
  }
};
</script>
<style scoped>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #555;
}
#nav a.router-link-exact-active {
  color: #3273dc;
}
</style>