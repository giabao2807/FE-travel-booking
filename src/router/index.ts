import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import requireAuth from '@/router/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true, roles: ['user'] }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AboutView,
    meta: { requiresAuth: true, roles: ['female'] }
  },
  {
    path: '/sign_in',
    name: 'signIn',
    component: SignInView,
    meta: { roles: ['guest'] }
  },
  {
    path: '/sign_up',
    name: 'signUp',
    component: SignUpView,
    meta: { roles: ['guest'] }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  requireAuth(to, from, next)
})

export default router
