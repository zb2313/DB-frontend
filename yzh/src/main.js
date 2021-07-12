import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//+引入组件库及相关样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css'
//让Vue使用ElementUI
Vue.use(ElementUI)
Vue.use(mavonEditor) // markdown  挂在到全局
Vue.config.productionTip = false
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