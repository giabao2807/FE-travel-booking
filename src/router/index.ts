import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ToursView from '@/views/tours/ToursView.vue'
import TourDetail from '@/views/tours/TourDetail.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dashboard from '@/layouts/Dashboard.vue'
import PartnerView from '@/views/dashboard/partner/index.vue'
import AdminView from '@/views/dashboard/admin/index.vue'
import HotelsView from '@/views/hotels/HotelsView.vue'
import HotelDetail from '@/views/hotels/HotelDetail.vue'
import requireAuth from '@/router/guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    meta: { requiresAuth: false },
    children: [
      { path: '', name:'homepage', component: HomeView },
      { path: 'tours', name:'tours', component: ToursView },
      { path: 'tour/:id', name:'tourDetail', component: TourDetail },
      { path: 'hotels', name:'hotels', component: HotelsView },
      { path: 'hotel/:id', name:'hotelDetail', component: HotelDetail }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, allowedRoles: ['Admin', 'Partner'] },
    children: [
      { path: 'partner', component: PartnerView, meta: { requiresAuth: true, roleChildren: ['Partner'] } },
      { path: 'admin', component: AdminView, meta: { requiresAuth: true, roleChildren: ['Admin'] } }
    ]
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  requireAuth(to, from, next)
})

export default router
