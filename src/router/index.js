import VueRouter from "vue-router";
import Vue from "vue";
import Home from "@/view/Home";
Vue.use(VueRouter)
const routes = [

    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/Homepage",
        name: "Homepage",
        meta: {
            title: '首页'
        },
        component: () => import('@/view/Homepage')
    },
    {
        path: '/hotelRegister',
        name: "HotelRegister",
        component: () => import('@/view/HotelRegister')
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( /* webpackChunkName: "login" */ '@/view/Login')
    }
    ,
    {
        path: "/Register",
        name: "Register",
        meta: {
            title: '注册'
        },
        component: () => import( /* webpackChunkName: "Register"*/ '@/view/Register')
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../view/Dashboard")
            },
            {
                path: "/AnnualReport",
                name: "AnnualReport",
                meta: {
                    title: '年度报告'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../view/Other/AnnualReport")
            },
            {
                path: '/travelplan',
                name: 'travelplan',
                meta:
                {
                    title: '创建行程'
                },
                component: () => import("../view/Other/travelplan.vue")
            },
            {
                path: '/makeplan',
                name: 'makeplan',
                component: () => import('../view/Other/makeplan.vue')
            },
            {
                path: '/completeplan',
                name: 'completeplan',
                component: () => import('../view/Other/completeplan.vue')
            },
            {
                path: '/myplan',
                name: 'myplan',
                component: () => import('../view/Other/myplan.vue')
            },
            {
                path: "/HistoryOrder",
                name: "HistoryOrder",
                meta:
                {
                    title: '历史订单'
                },
                component: () => import("../view/HistoryOrder")
            },
            {
                path: "/AttractionOrder",
                name: "AttractionOrder",
                meta: {
                    title: '景点门票表'
                },
                component: () => import("../view/AttractionOrder")
            },
            {
                path: "/TrafficOrder",
                name: "TrafficOrder",
                meta: {
                    title: '交通票表'
                },
                component: () => import("../view/TrafficOrder")
            },
            {
                path: "/HotelOrder",
                name: "HotelOrder",
                meta: {
                    title: '订酒店表'
                },
                component: () => import("../view/HotelOrder")
            },
            {
                path: "/Favorites",
                name: "Favorites",
                meta: {
                    title: '收藏夹'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../view/Favorites.vue")
            },
            {
                path: "/FavoritesContent",
                name: "FavoritesContent",
                meta: {
                    title: '收藏夹内容'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../view/FavoritesContent.vue")
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import( /* webpackChunkName: "form" */ "../view/BaseForm.vue")
            },
            {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../view/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '使用帮助'
                },
                component: () => import( /* webpackChunkName: "donate" */ "../view/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "permission" */ "../view/Permission.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import(/* webpackChunkName: "404" */ '../view/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import(/* webpackChunkName: "403" */ '../view/403')
            },

        ]
    },
    {
        path: '/SellerHome',
        name: "商家主页",
        meta: {
            title: '商家主页'
        },
        component: () => import('../view/SellerHome'),
        children: [
            {
                path: '/SellerPost',
                name: 'SellerPost',
                component: () => import('../view/SellerPost')
            },
            {
                path: '/SellerEdit',
                name: 'SellerEdit',
                component: () => import('../view/SellerEdit')
            },
            {
                path: '/SellerDelete',
                name: 'SellerDelete',
                component: () => import('../view/SellerDelete')
            },
            {
                path: '/SellerInfo',
                name: 'SellerInfo',
                component: () => import('../view/SellerInfo')
            }
        ]
    },
    {
        path: '/hotel',
        name: 'hotel',
        component: () => import('../view/hotel/index.vue'),
    },
    {
        path: '/hotel/city',
        name: 'hotelCity',
        component: () => import('../view/hotel/city.vue'),
    },
    {
        path: '/hotel/HotelOrder',
        name: 'HotelOrder',
        component: () => import('../view/hotel/HotelOrder.vue')
    },
    {
        path: '/hotel/detail',
        name: 'HotelDetail',
        component: () => import('../view/hotel/detail.vue')
    },
    {
        path: '/attraction/city',
        name: 'attractionCity',
        component: () => import('../view/attraction/city.vue')
    },
    {
        path: '/attraction',
        name: 'attraction',
        component: () => import('../view/attraction/Home.vue')
    },
    {
        path: '/attraction/detail',
        name: 'AttrDetail',
        component: () => import('../view/attraction/detail.vue')
    },
    {
        path: '/tickets',
        name: 'tickets',
        component: () => import('../view/tickets/Home.vue')
    },
    {
        path: '/tickets/trainquery',
        name: 'tickets',
        component: () => import('../view/tickets/trainquery.vue')
    },
    {
        path: '/tickets/planequery',
        name: 'planequery',
        component: () => import('../view/tickets/planequery.vue')
    },
    {
        path: '/tickets/Order',
        name: 'ticketsOrder',
        component: () => import('../view/tickets/Order.vue')
    },
    {
        path: '/questions',
        name: 'QA',
        component: () => import('../view/Other/questions.vue')
    },
    {
        path: '/strategy',
        name: 'strategy',
        component: () => import('../view/Other/strategy.vue')
    },
    {
        path: '/strategyDetail',
        name: 'strategyDetail',
        component: () => import('../view/Other/strategyDetail.vue')
    },
    {
        path: '/Moment',
        name: 'Moment',
        component: () => import('../components/Home.vue'),
        children: [
            {
                path: '/',
                component: () => import('../components/Moments.vue'),
            },
            {
                path: '/1',
                component: () =>
                    import('../components/Moments.vue')
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
            import( /* webpackChunkName: "about" */ '../components/Publish.vue')
    },
    {
        path: '/3',
        name: 'CheckComment',
        component: () =>
            import('../components/CheckComment.vue')
    },
    {
        path: '/3/:momenT_ID',
        component: () =>
            import('../components/SingleComment.vue')
    },
    {
        path: '/1/:momenT_ID',
        component: () =>
            import('../components/SingleMoment.vue')
    },
    {
        path: '/personalpage',
        name: 'Personalpage',
        component: () => import('../view/Personalpage.vue')
    },
    {
        path: '/auditmoment',
        name: 'AuditMoment',
        component: () => import('../components/AuditMoment.vue')
    },
    {
        path: '/auditmerchant',
        name: 'AuditMerchant',
        component: () => import('../components/AuditMerchant.vue')
    },
    {
        path: '/sendmail',
        name: 'SendMail',
        component: () => import('../components/SendMail.vue')
    },
    {
        path: '/updateFAQ',
        name: 'UpdateFAQ',
        component: () => import('../components/UpdateFAQ.vue')
    },
    {
        path: '/SellerHome',
        name: 'SellerHome',
        component: () => import('../view/SellerHome'),
        children: [
            {
                path: '/SellerPost',
                name: 'SellerPost',
                component: () => import('../view/SellerPost')
            }
        ]
    },

];
const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
