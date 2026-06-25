import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: { title: 'login.title', requiresAuth: false, hidden: true },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/layout/AppLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { title: 'layout.sidebar.dashboard', icon: 'Odometer' },
      },
      {
        path: 'user',
        name: 'UserManagement',
        component: () => import('@/views/user/UserManagement.vue'),
        meta: { title: 'layout.sidebar.userManagement', icon: 'User' },
      },
      {
        path: 'data',
        name: 'DataManagement',
        component: () => import('@/views/data/DataManagement.vue'),
        meta: { title: 'layout.sidebar.dataManagement', icon: 'Document' },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/SettingsView.vue'),
        meta: { title: 'layout.sidebar.settings', icon: 'Setting' },
      },
      {
        path: 'user-center',
        name: 'UserCenter',
        component: () => import('@/views/user-center/UserCenter.vue'),
        meta: { title: 'userCenter.title', hidden: true },
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/NotFound.vue'),
    meta: { title: 'error.notFound', requiresAuth: false, hidden: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
