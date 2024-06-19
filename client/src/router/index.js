import { createRouter, createWebHistory } from 'vue-router'
import Ping from "../components/Ping.vue"
import Books from "../components/Books.vue"
import OrderSuccess from "../components/OrderSuccess.vue"
import OrderCanceled from "../components/OrderCanceled.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ping',
      name: 'ping',
      component: Ping
    },
    {
      path: '/',
      name: 'Books',
      component: Books,
    },
    {
      path: '/success',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/canceled',
      name: 'OrderCanceled',
      component: OrderCanceled
    }
  ]
})

export default router
