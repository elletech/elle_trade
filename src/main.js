import Vue from "vue";
import './plugins/vuetify'
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@fortawesome/fontawesome-free/css/all.css'
import money from 'v-money'

// register directive v-money and component <money>
Vue.use(money, {precision: 4})

import Firebase from "./firebase";
Firebase.init();

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");