// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 套件內容
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTWValidata from 'vee-validate/dist/locale/zh_TW';
  
// 自定義內容
import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// Vue.use(VeeValidate); // 預設值無法正常在點按 Focus 到 input 再點外面 不像會即時監聽
Vue.use(VeeValidate, {
  events: 'input|blur',
});
VeeValidate.Validator.localize('zh_TW', zhTWValidata);

axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

router.beforeEach((to, from, next) => {
  console.log("to: ", to, 'from: ', from, "next: ", next);
  // ...
  if(to.meta.requiresAuth){
    console.log('這裡需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        // vm.$router.push('/');
        if (response.data.success){
          next();
        } else {
          next({ path: '/login' });
        }
      }
    })
  }else{
    next();
  }
})