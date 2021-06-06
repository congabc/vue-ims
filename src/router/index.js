import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "../components/Layout.vue";
import Home from '../views/home'
import Terminal from '../views/channel/terminal'
import Special from '../views/channel/special'
import Wholesale from '../views/channel/wholesale'
import Booze from '../views/supplier/booze'
import Cigarette from '../views/supplier/cigarette'
import Drinks from '../views/supplier/drinks'
import Clearwater from '../views/supplier/clearwater'
import Snacks from '../views/supplier/snacks'
import Milk from '../views/supplier/milk'
import Repertory from '../views/repertory'
import Motorman from '../views/staff/motorman'
import Salesman from '../views/staff/salesman'
import bucunzai from "../views/404.vue"
Vue.use(VueRouter);
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题


const routes = [
  {
    path: "/404",
    name: "Layout",
    component: bucunzai,
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: {title: '首页'}
        },
      ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/channel",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/channel/terminal',
          component: Terminal,
          meta: {title: '终端客户'}
        },
      ]
  },
  {
    path: "/channel",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/channel/special',
          component: Special,
          meta: {title: '特殊渠道客户'}
        },
      ]
  },
  {
    path: "/channel",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/channel/wholesale',
          component: Wholesale,
          meta: {title: '批发客户'}
        },
      ]
  },
  {
    path: "/supplier",
    name: "Layout",
    component: Layout,
    redirect: '/supplier',
      children: [
        {
          path: '/supplier/booze',
          component: Booze,
          meta: {title: '酒水类'}
        },
      ]
  },
  {
    path: "/supplier",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/supplier/cigarette',
          component: Cigarette,
          meta: {title: '香烟类'}
        },
      ]
  },
  {
    path: "/supplier",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/supplier/drinks',
          component: Drinks,
          meta: {title: '饮料类'}
        },
      ]
  },
  {
    path: "/supplier",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/supplier/clearwater',
          component: Clearwater,
          meta: {
            title: 'permission', icon: 'el-icon-menu', roles: ['admin']
          },
        },
      ]
  },
  {
    path: "/supplier",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/supplier/milk',
          component: Milk,
          meta: {title: '奶制品'}
        },
      ]
  },
  {
    path: "/supplier",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/supplier/snacks',
          component: Snacks,
          meta: {title: '零食类'}
        },
      ]
  },
  {
    path: "/repertory",
    name: "Layout",
    component: Layout,
    redirect: '/repertory',
    children: [
      {
        path: '/repertory',
        component: Repertory,
        meta: {title: '库存',roles: ['admin']}
      },
    ]
  },
  {
    path: "/staff",
    name: "Layout",
    component: Layout,
    redirect: '/',
    meta: {requireAuth: false,roles: ['admin']},
      children: [
        {
          path: '/staff/motorman',
          component: Motorman,
          meta: {title: '司机',roles: ['admin']}
        },
      ]
  },
  {
    path: "/staff",
    name: "Layout",
    component: Layout,
    redirect: '/',
      children: [
        {
          path: '/staff/salesman',
          component: Salesman,
          meta: {title: '业务员',roles: ['admin']}
        },
      ]
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


export default router;
