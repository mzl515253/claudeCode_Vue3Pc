import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { getToken } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, _from, next) => {
  const token = getToken()
  const requiresAuth = to.meta.requiresAuth !== false

  if (requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else if (!requiresAuth && token && to.path === '/login') {
    next('/dashboard')
  } else {
    next()
  }
})

// Dynamic document title
router.afterEach((to) => {
  const titleKey = (to.meta.title as string) || ''
  document.title = titleKey ? `Admin - ${titleKey}` : 'Vue3 Admin System'
})

export default router
