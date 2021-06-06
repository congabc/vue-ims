import Vue from "vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import * as echarts from 'echarts'
import store from './store'
import { PcCookie, Key } from '@/utils/cookie'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 权限拦截
import './permission'
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
