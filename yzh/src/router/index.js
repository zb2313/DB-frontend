import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import location from '../components/Location/location.vue'
import SendComment from '../components/SendComment.vue'
import CheckComment from '../components/CheckComment.vue'
import Comment from '../components/Comment.vue'
import Publish from '../components/Publish.vue'
import SingleComment from '../components/CheckComment.vue'
import SingleMoment from '../components/SingleMoment.vue'
import Moments from '../components/Moments.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
                path: '/',
                component: Moments,
            },
            {
                path: '/1',
                component: () =>
                    import ('../components/Moments.vue')
            },

        ]
    },
    {
        path: '/2',
        name: 'SendComment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/Publish.vue')
    },
    {
        path: '/3',
        name: 'CheckComment',
        component: () =>
            import ('../components/CheckComment.vue')
    },
    {
        path: '/3/:momenT_ID',
        component: () =>
            import ('../components/SingleComment.vue')
    },
    {
        path: '/1/:momenT_ID',
        component: () =>
            import ('../components/SingleMoment.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router