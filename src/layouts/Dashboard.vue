<template>
  <v-sheet>
    <v-navigation-drawer
      v-model="drawer"
      @update:rail="checkRail"
      expand-on-hover
      rail
      color="surface"
      class="test"
    >
      <v-list>
        <v-list-item
          :prepend-avatar="authUser?.avatar"
          :title="authUser?.fullName"
          :subtitle="authUser?.email"
        />
      </v-list>
      <v-divider />
      <v-list
        v-if="authUser.role === 'Admin'"
        active-color="primary"
        density="compact"
        nav
        mandatory
        v-model="selectMenu"
      >
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="dashboard"
          @click="() => handleRoute({ name: 'admin' })"
        />
        <v-list-item
          prepend-icon="mdi-card-account-details-outline"
          title="Quản lí Users"
          value="users"
          @click="() => handleRoute({ name: 'users' })"
        />
        <v-list-item
          prepend-icon="mdi-compass-rose"
          title="Danh Sách Tours"
          value="adminTours"
          @click="() => handleRoute({ name: 'adminTours' })"
        />
        <v-list-item
          prepend-icon="mdi-shield-home-outline"
          title="Danh Sách Hotels"
          value="adminHotels"
          @click="() => handleRoute({ name: 'adminHotels' })"
        />
        <v-list-item
          prepend-icon="mdi-archive-check-outline"
          title="Danh Sách Booking"
          value="adminBooking"
          @click="() => handleRoute({ name: 'adminBooking' })"
        />
        <v-list-item
          prepend-icon="mdi-ticket-percent-outline"
          title="Quản lí Coupons"
          value="coupon"
          @click="() => handleRoute({ name: 'couponsAdmin' })"
        />
      </v-list>
      <v-list
        v-else
        active-color="primary"
        density="compact"
        nav
        mandatory
        v-model="selectMenu"
      >
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="dashboard"
          @click="() => handleRoute({ name: 'partner' })"
        />
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-compass-rose"
              title="Quản Lý Tours"
              value="tours"
            />
          </template>
          <v-list-item
            v-for="tour in TOURS_PANEL"
            :key="tour.value"
            :title="tour.name"
            :value="tour.value"
            @click="() => handleRoute({ name: tour.value })"
            :class="rail ? 'custom-child-select' : ''"
          >
            <template #prepend>
              <v-icon :icon="tour.icon" :class="rail ? 'icon' : 'mr-3'" />
            </template>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-shield-home-outline"
              title="Quản Lý Hotels"
              value="hotels"
            />
          </template>
          <v-list-item
            v-for="hotel in HOTELS_PANEL"
            :key="hotel.value"
            :title="hotel.name"
            :value="hotel.value"
            @click="() => handleRoute({ name: hotel.value })"
            :class="rail ? 'custom-child-select' : ''"
          >
            <template #prepend>
              <v-icon :icon="hotel.icon" :class="rail ? 'icon' : 'mr-3'" />
            </template>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-ticket-percent-outline"
              title="Quản lí Coupons"
              value="coupon"
            />
          </template>
          <v-list-item
            v-for="coupon in COUPON_PANEL"
            :key="coupon.value"
            :title="coupon.name"
            :value="coupon.value"
            @click="() => handleRoute({ name: coupon.value })"
            :class="rail ? 'custom-child-select' : ''"
          >
            <template #prepend>
              <v-icon :icon="coupon.icon" :class="rail ? 'icon' : 'mr-3'" />
            </template>
          </v-list-item>
        </v-list-group>
        <v-list-item
          prepend-icon="mdi-archive-check-outline"
          title="Quản lí booking"
          value="booking"
          @click="() => handleRoute({ name: 'bookingPartner' })"
        />
      </v-list>
      <template #append>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Đăng Xuất"
            value="signOut"
            @click="signOut"
          />
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar :order="order" theme="theme" flat>
      <v-app-bar-title>
        <v-row align="center">
          <img src="@/assets/img/logo-dashboard.svg" alt="SVG Image">
          <p class="header-title font-palanquin">
            TravelNE
          </p>
        </v-row>
      </v-app-bar-title>
      <v-spacer />
      <v-icon class="mx-5" color="primary" icon="mdi-lightbulb-night" @click="toggleTheme" />
      <template #image>
        <n-image :src="require(`@/assets/img/${imgAppBar}`)" />
      </template>
      <template #prepend>
        <v-icon v-if="!drawer" class="my-5" icon="mdi-menu-open" @click.stop="drawer = !drawer" />
      </template>
    </v-app-bar>
    <v-container fluid class="partner-page">
      <router-view />
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import { computed, ref, onMounted } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { useAuthentication } from '@/composables/useAuth'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { handleRoute } from '@/helpers/loadingRoute'

const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const drawer = ref<boolean>(true)
const theme = useTheme()
const selectMenu = ref<string>('dashboard')
const toggleTheme = () => {
  return theme.global.name.value = theme.global.current.value.dark ? 'myCustomLightTheme' : 'dark'
}
const rail = ref<boolean>(true)
const checkRail = (e: any) => {
  rail.value = e
}
const order = computed(() => {
  return !drawer.value ? '-1' : '0'
})

const imgAppBar = computed(() => {
  return theme.global.name.value === 'dark' ? 'app_bar_dark.jpg' : 'app_bar.jpg'
})
const TOURS_PANEL = [
  { name: 'Danh Sách Tours', value: 'toursPartner', icon: 'mdi-format-list-checkbox' },
  { name: 'Tạo Mới Tour', value: 'createTour', icon: 'mdi-note-edit-outline' }
]
const HOTELS_PANEL = [
  { name: 'Danh Sách Hotels', value: 'hotelsPartner', icon: 'mdi-format-list-checkbox' },
  { name: 'Tạo Mới Hotel', value: 'createHotel', icon: 'mdi-note-edit-outline' }
]
const COUPON_PANEL = [
  { name: 'Danh Sách Coupons', value: 'couponsPartner', icon: 'mdi-format-list-checkbox' },
  { name: 'Tạo Mới Coupon', value: 'createCoupon', icon: 'mdi-note-edit-outline' }
]
const {
  signOut
} = useAuthentication()
onMounted(async() => {
  const session = await sessionStorage.getItem('userData')
  authUser.value = session ? JSON.parse(session) : ''
})

</script>
<style lang="scss" scoped>
.header-title {
  margin-left: -10px;
  font-size: 22px;
  font-weight: bold;
}
.partner-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  min-height: 45rem;
}
.border {
  margin-left: 12px;
  margin-right: 12px;
  background: #d8dfe9;
  border-radius: 50%;
  text-decoration: none;
}

.custom-child-select {
  font-size: 10px;
  .icon {
    margin-left: -50px;
  }
}



</style>