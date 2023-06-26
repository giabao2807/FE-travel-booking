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
          v-for="item in MENU_ADMIN"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.name"
          :active="item.value === selectMenu"
          @click="() => {
            handleRoute({ name: item.value })
            selectMenu = item.value
          }"
        />
      </v-list>
      <v-list
        v-else
        active-color="primary"
        density="compact"
        nav
        mandatory
      >
        <v-list-item
          v-for="item in MENU_PARTNER"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.name"
          :active="item.value === selectMenu"
          @click="() => {
            handleRoute({ name: item.value })
            selectMenu = item.value
          }"
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
      <template #image>
        <n-image :src="require(`@/assets/img/${imgAppBar}`)" />
      </template>
      <div :class="rail ? '' : 'logo-text'">
        <v-row align="center">
          <img src="@/assets/img/logo-dashboard.svg" alt="SVG Image">
          <p class="header-title font-palanquin">
            TravelNE
          </p>
        </v-row>
      </div>
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
import { MENU_ADMIN, MENU_PARTNER } from '@/resources/mockData'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const drawer = ref<boolean>(true)
const theme = useTheme()
const selectMenu = ref<string>('')
const route = useRoute()
const rail = ref<boolean>(true)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkRail = (e: any) => {
  rail.value = e
}
const order = computed(() => {
  return !drawer.value ? '-1' : '0'
})

const imgAppBar = computed(() => {
  return theme.global.name.value === 'dark' ? 'app_bar_dark.jpg' : 'app_bar.jpg'
})
const {
  signOut
} = useAuthentication()
onMounted(async() => {
  const session = await sessionStorage.getItem('userData')
  authUser.value = session ? JSON.parse(session) : ''
  if (authUser.value.role === 'Admin'){
    selectMenu.value = MENU_ADMIN.find(item => item.value === route.name)?.value || ''
  }
  else {
    selectMenu.value = MENU_PARTNER.find(item => item.value === route.name)?.value || ''
  }
})
</script>
<style lang="scss" scoped>
.header-title {
  margin-left: -10px;
  font-size: 22px;
  font-weight: bold;
}
.logo-text {
	transition: all 0.6s cubic-bezier(0.680, -0.550, 0.265, 1.550);
  position: absolute;
  right: 0;
  margin-right: 50px
}
.partner-page {
  background-image: url('@/assets/img/map-bg.png');
  background-size: contain;
  background-position: center center;
  min-height: 50rem;
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