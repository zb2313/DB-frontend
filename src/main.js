import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import Distpicker from 'v-distpicker'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import axios from 'axios'
import 'mavon-editor/dist/css/index.css'
import VueAMap from 'vue-amap';

// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.component('v-distpicker', Distpicker)
Vue.prototype.$axios = axios;

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '3c8d72e09340bbf72057257e264b65a2',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.HawkEye', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Weather', 'AMap.Geocoder'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'
});
// Vue.use(ElementPlus)
new Vue({
  router,
  Distpicker,
  render: h => h(App),
}).$mount('#app')
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  return `${m}/${d}/${y} ${hh}:${mm}`
})
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;    //将token放到请求头发送给服务器
    return config;
  }
  else {
    return config;
  }
}, function (error) {
  return Promise.reject(error);
});

