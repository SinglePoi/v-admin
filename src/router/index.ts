import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useAccount } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/main/main.vue')
    }
  ]
})

nProgress.configure({
  showSpinner: false
})

/**
 * 准备拦截路由挂载函数
 */
const handle = {
  apply(target, thisArg, argumentsList) {
    const account = useAccount()
    account.setupMenus()

    return Reflect.apply(target, thisArg, argumentsList)
  }
} as ProxyHandler<any>

router.install = new Proxy(router.install, handle)

// 全局前置守卫
router.beforeEach((to, from) => {
  nProgress.start()
  const account = useAccount()
  if (to.path !== '/login') {
    if (!account.isLogin) {
      return '/login'
    }
  }
  return true
})

// // 全局后置钩子
router.afterEach(() => {
  nProgress.done(true)
})

export default router
