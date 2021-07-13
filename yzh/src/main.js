import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';
//+引入组件库及相关样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css'
//让Vue使用ElementUI
Vue.use(ElementUI)
Vue.use(mavonEditor) // markdown  挂在到全局
Vue.config.productionTip = false



// 自定义指令
// el：元素  binding：表示对象
Vue.directive('rainbow', {
    bind(el, binding, vnode) {
        el.style.color =
            '#' +
            Math.random()
            .toString(16)
            .slice(2, 8) // 第2～7个数，不包含第 8 个
    },
})
Vue.directive('theme', {
    bind(el, binding, vnode) {
        // v-theme="'wide'"
        if (binding.value == 'wide') {
            el.style.maxWidth = '760px'
        } else if (binding.value == 'narrow') {
            el.style.maxWidth = '560px'
        }
        // binding.arg：binging 的参数
        if (binding.arg === 'column') {
            el.style.background = '#c8c8c9' // 灰色
            el.style.padding = '20px'
        }
    },
})

// 自定义过滤器
Vue.filter('snippet', function(value) {
    return value.slice(0, 100) + '...'
})

var vm = new Vue({
        data: {
            // declare message with an empty value
            isCollapse: false
        },
        template: '<div>{{ message }}</div>'
    })
    // set `message` later
new Vue({
    data: {
        // declare message with an empty value
        isCollapse: false
    },
    router,
    store,
    render: h => h(App)
}).$mount('#app')