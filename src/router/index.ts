import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '@/views/login/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: UserLogin
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/main/main.vue'),
      children: [
        {
          path: 'system/user',
          name: 'user',
          component: () => import('@/views/system/user/user.vue')
        }
      ]
    }
  ]
})
export default router
