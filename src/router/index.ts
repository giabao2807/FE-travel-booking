import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ToursView from '@/views/tours/ToursView.vue'
import TourDetail from '@/views/tours/TourDetail.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HotelsView from '@/views/hotels/HotelsView.vue'
import HotelDetail from '@/views/hotels/HotelDetail.vue'
import AboutView from '@/views/AboutView.vue'
import DashboardDefault from '@/views/dashboard/partner/Dashboard.vue'
import requireAuth from '@/router/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    meta: { requiresAuth: false },
    children: [
      { path: '', component: HomeView },
      { path: 'tours', component: ToursView },
      { path: 'tour/:id', name:'tourDetail', component: TourDetail },
      { path: 'hotels', component: HotelsView },
      { path: 'hotel/:id', name:'hotelDetail', component: HotelDetail }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AboutView,
    meta: { requiresAuth: true, allowedRoles: ['Admin', 'hotel'] }
  },
  {
    path: '/sign_in',
    name: 'signIn',
    component: SignInView,
    meta: { requiresAuth: false, allowedRoles: ['guest'] }
  },
  {
    path: '/sign_up',
    name: 'signUp',
    component: SignUpView,
    meta: { requiresAuth: false, allowedRoles: ['guest'] }
  },
  {
    path: '/dashboard-default',
    name: 'DashboardDefault',
    component: DashboardDefault
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
