import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      // 如果不是存在於下面設定的路徑，就會被導到指定的頁面。
      path: '*',
      redirect: 'login',
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      // meta: { requiresAuth: true },
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }, // 進入頁面前要被驗証所以父層移下來使用，上面先註解起來
        },
        {
          path: 'orders', // 訂單列表
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true }, // 進入頁面前要被驗証所以父層移下來使用，上面先註解起來
        },
        {
          path: 'coupons', // 優惠券列表
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true }, // 進入頁面前要被驗証所以父層移下來使用，上面先註解起來
        },
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children:[
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ]
    },
  ]
})
