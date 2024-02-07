import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('../views/Reservation.vue')
    },
    {
      path: '/reservation-inquiry',
      name: 'reservation-inquiry',
      component: () => import('../views/ReservationInquiry.vue')
    },
    {
      path: '/reservation-modify',
      name: 'reservation-modify',
      component: () => import('../views/ReservationModify.vue')
    }
    // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/main.vue')
    // }
  ]
})

export default router
