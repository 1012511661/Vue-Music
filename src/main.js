// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
//单文件为 index 的文件,不用写，webpack会自动查找
//import router from "./router/index";
import router from "./router";
import Vuex from "vuex";
Vue.use(Vuex);
import store from "./store";

//引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  Vuex,
  store,
  components: { App },
  template: "<App/>"
});
