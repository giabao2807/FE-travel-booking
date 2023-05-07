import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ToursView from '@/views/ToursView.vue'
import HotelsView from '@/views/HotelsView.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AboutView from '@/views/AboutView.vue'
import requireAuth from '@/router/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    children: [
      { path: '', component: HomeView },
      { path: 'tours', component: ToursView },
      { path: 'hotels', component: HotelsView }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AboutView,
    meta: { requiresAuth: true, roles: ['Admin'] }
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
