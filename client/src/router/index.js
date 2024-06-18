import { createRouter, createWebHistory } from 'vue-router'
import Ping from "../components/Ping.vue"
import Books from "../components/Books.vue"

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
    }
  ]
})

export default router
