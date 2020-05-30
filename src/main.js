import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import httpApi from './http_api/index.js';
Vue.config.productionTip = false;
Vue.prototype.$http = httpApi;
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
