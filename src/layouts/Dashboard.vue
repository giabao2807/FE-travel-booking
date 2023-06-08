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
              <v-icon :icon="tour.icon" :class="rail ? 'icon' : ''" />
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
            v-for="([title, icon], i) in [
              ['Management', 'mdi-account-multiple-outline'],
              ['Change', 'mdi-cog-outline'],
            ]"
            :key="i"
            :title="title"
            :value="title"
            :class="rail ? 'custom-child-select' : ''"
          >
            <template #prepend>
              <v-icon :icon="icon" :class="rail ? 'icon' : ''" />
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template #append>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-logout"
            title="SignOut"
            value="signOut"
            @click="signOut"
          />
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar :order="order" theme="theme" flat>
      <v-app-bar-title>Travel NE</v-app-bar-title>
      <v-spacer />
      <h4 class="blue--text text--lighten-2">Dashboard</h4>
      <v-icon class="mx-5" color="primary" icon="mdi-lightbulb-night" @click="toggleTheme" />
      <template #image>
        <n-image :src="require(`@/assets/img/${imgAppBar}`)" />
      </template>
      <template #prepend>
        <v-icon v-if="!drawer" class="my-5" icon="mdi-menu-open" @click.stop="drawer = !drawer" />
      </template>
    </v-app-bar>
    <v-container>
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
  { name: 'List Tours', value: 'tours', icon: 'mdi-format-list-checkbox' },
  { name: 'Create Tour', value: 'createTour', icon: 'mdi-note-edit-outline' }
]
const {
  signOut
} = useAuthentication()
onMounted(async() => {
  const session = await sessionStorage.getItem('userData')
  authUser.value = session ? JSON.parse(session) : ''
  console.log(selectMenu.value)
})

</script>
<style lang="scss" scoped>
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