import Vue from "vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 权限拦截
// import './permission'
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
