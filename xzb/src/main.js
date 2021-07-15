import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import Distpicker from 'v-distpicker'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css'
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.component('v-distpicker',Distpicker)
// Vue.use(ElementPlus)
new Vue({
  router,
  Distpicker,
  render: h => h(App),
}).$mount('#app')
