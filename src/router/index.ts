import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router
// import { createRouter, createWebHashHistory } from 'vue-router'
// import type { RouteRecordRaw } from 'vue-router'

// import localCache from '@/utils/cache'

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     redirect: '/main'
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/login.vue')
//   },
//   {
//     path: '/main',
//     component: () => import('@/views/main/main.vue')
//   }
// ]

// const router = createRouter({
//   routes,
//   history: createWebHashHistory()
// })

// router.beforeEach((to) => {
//   if (to.path !== '/login') {
//     const token = localCache.getCache('token')
//     if (!token) {
//       return '/login'
//     }
//   }
// })

// export default router
