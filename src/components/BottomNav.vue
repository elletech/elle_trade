<template>
  <div id="bottom-nav" >
    <v-card height="100%" flat >
        <v-bottom-nav
        :active.sync="bottomNav"
        :value="true"
        absolute
        color="transparent"
        >
        <v-btn
            color="teal"
            flat
            value="recent"
        >
            <span>Recent</span>
            <v-icon>history</v-icon>
        </v-btn>

        <v-btn
            color="teal"
            flat
            value="favorites"
        >
            <span>Favorites</span>
            <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn
            color="teal"
            flat
            value="nearby"
        >
            <span>Nearby</span>
            <v-icon>place</v-icon>
        </v-btn>
        </v-bottom-nav>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recent'
      }
    }
  }
</script>

<style scoped>
 /* BottomNavを固定CSS */
 #bottom-nav {
      width: 100%;
      background: #4499cc;
      position: fixed;
      bottom: 0;
      z-index:999;
    } 
</style>
