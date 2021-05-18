import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../components/Layout.vue";
// import Home from "../views/home/index.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
