import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueMoment from "vue-moment";
import Vue2Filters from "vue2-filters";
import StarRating from "vue-star-rating";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false;

Vue.use(VueMoment);
Vue.use(Vue2Filters);
Vue.component("star-rating", StarRating);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
