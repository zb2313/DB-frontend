import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from "@/components/Register"
import PersonalPage from "@/components/PersonalPage/PersonalPage";
// import HistoryOrder from "@/components/HistoryOrder/HistoryOrder";
// import Favorites from "@/components/Favorites/Favorites";
Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/Register',
            name: 'Register',
            component:Register
        },
        {
            path: '/PersonalPage',
            name:'PersonalPage',
            component:PersonalPage
        }
    ]
})




