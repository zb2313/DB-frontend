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
//import echarts from 'echarts'

//Vue.use(echarts)
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.component('v-distpicker',Distpicker)
Vue.prototype.$axios=axios;
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
  return `${m}/${d}/${y} ${hh}:${mm}PM`
})
