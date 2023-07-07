import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ToursView from '@/views/tours/ToursView.vue'
import TourDetail from '@/views/tours/TourDetail.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dashboard from '@/layouts/Dashboard.vue'
import PartnerView from '@/views/dashboard/partner/index.vue'
import PartnerTour from '@/views/dashboard/partner/tours/index.vue'
import CreateTour from '@/views/dashboard/partner/tours/CreateTour.vue'
import PartnerHotel from '@/views/dashboard/partner/hotels/index.vue'
import CreateHotel from '@/views/dashboard/partner/hotels/CreateHotel.vue'
import PartnerCoupons from '@/views/dashboard/partner/coupons/index.vue'
import CreateCoupon from '@/views/dashboard/partner/coupons/CreateCoupon.vue'
import AdminCoupons from '@/views/dashboard/admin/coupons/index.vue'
import CreateAdminCoupon from '@/views/dashboard/admin/coupons/CreateCoupon.vue'
import Users from '@/views/dashboard/admin/users/index.vue'
import AdminTours from '@/views/dashboard/admin/tours/index.vue'
import AdminHotels from '@/views/dashboard/admin/hotels/index.vue'
import AdminBooking from '@/views/dashboard/admin/booking/index.vue'
import BookingPartner from '@/views/dashboard/partner/booking/index.vue'
import AdminView from '@/views/dashboard/admin/index.vue'
import HotelsView from '@/views/hotels/HotelsView.vue'
import HotelDetail from '@/views/hotels/HotelDetail.vue'
import UserView from '@/views/user/index.vue'
import BookingView from '@/views/user/BookingView.vue'
import FavoriteView from '@/views/user/FavoriteView.vue'
import NotFound from '@/views/NotFound.vue'
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
      { path: 'hotel/:id', name:'hotelDetail', component: HotelDetail },
      { path: 'userinfo', name:'userInfo', component: UserView },
      { path: '/booking/payment', name: 'booking', component: BookingView },
      { path: '/favorite', name: 'favorite', component: FavoriteView }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, allowedRoles: ['Admin', 'Partner'] },
    children: [
      {
        path: 'partner',
        meta: { requiresAuth: true, roleChildren: ['Partner'] },
        children: [
          { path: '', name:'partner', component: PartnerView },
          { path: 'tours', name:'toursPartner', component: PartnerTour },
          { path: 'create-tour', name:'createTour', component: CreateTour },
          { path: 'hotels', name:'hotelsPartner', component: PartnerHotel },
          { path: 'create-hotel', name:'createHotel', component: CreateHotel },
          { path: 'coupons', name:'couponsPartner', component: PartnerCoupons },
          { path: 'create-coupon', name:'createCoupon', component: CreateCoupon },
          { path: 'booking', name:'bookingPartner', component: BookingPartner }
        ]
      },
      {
        path: 'admin',
        meta: { requiresAuth: true, roleChildren: ['Admin'] },
        children: [
          { path: '', name:'admin', component: AdminView },
          { path: 'coupons', name:'couponsAdmin', component: AdminCoupons },
          { path: 'create-coupon', name:'createAdminCoupon', component: CreateAdminCoupon },
          { path: 'users', name:'users', component: Users },
          { path: 'tours', name:'adminTours', component: AdminTours },
          { path: 'hotels', name:'adminHotels', component: AdminHotels },
          { path: 'booking', name:'adminBooking', component: AdminBooking }
        ]
      }
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
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes]
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  requireAuth(to, from, next)
})

export default router
