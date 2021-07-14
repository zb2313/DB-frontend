import Vue from 'vue'
import VueRouter from 'vue-router'
import hotelCity from '../views/hotel/city.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/hotel' //重定向
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/Register',
    name: '',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () => import('../views/hotel/index.vue'),
  },
  {
    path: '/hotel/city',
    name: 'hotelCity',
    component: hotelCity,
  },
  {
    path: '/hotel/HotelOrder',
    name: 'HotelOrder',
    component: () => import('../views/hotel/HotelOrder.vue')
  },
  {
    path: '/attraction/city',
    name: 'attractionCity',
    component: () => import('../views/attraction/city.vue')
  },
  {
    path: '/attraction',
    name: 'attraction',
    component: () => import('../views/attraction/Home.vue')
  },
  {
    path: '/attraction/AttrOrder',
    name: 'AttrOrder',
    component: () => import('../views/attraction/AttrOrder.vue')
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: () => import('../views/tickets/Home.vue')
  },
  {
    path: '/tickets/detail',
    name: 'tickets',
    component: () => import('../views/tickets/detail.vue')
  },
  {
    path: '/tickets/Order',
    name: 'ticketsOrder',
    component: () => import('../views/tickets/Order.vue')
  },
  {
    path: '/questions',
    name: 'QA',
    component: () => import('../views/Other/questions.vue')
  },


]

const router = new VueRouter({
  routes
})

export default router
