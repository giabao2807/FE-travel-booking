<template>
  <v-sheet>
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

    <v-navigation-drawer
      v-model="drawer"
      @update:rail="check"
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
      >
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="dashboard"
        />
        <v-list-group
          prepend-icon="mdi-compass-rose"
          title="Quản Lý Tours"
          value="tours"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
            />
          </template>
          <v-list-item
            v-for="([title, icon], i) in [
              ['List Tours', 'mdi-format-list-checkbox'],
              ['Settings', 'mdi-cog-outline'],
            ]"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          />
        </v-list-group>
        <v-list-group value="Users">
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
              ['Settings', 'mdi-cog-outline'],
            ]"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
          />
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
    <v-container :class="!rail ? 'main-container': ''">
      <router-view />
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
import NImage from '@/components/NImage.vue'
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { useAuthentication } from '@/composables/useAuth'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const drawer = ref<boolean>(true)
const theme = useTheme()
const toggleTheme = () => {
  return theme.global.name.value = theme.global.current.value.dark ? 'myCustomLightTheme' : 'dark'
}
const rail = ref<boolean>(true)
const check = (e: any) => {
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
</script>
<style lang="scss" scoped>
.border {
  margin-left: 12px;
  margin-right: 12px;
  background: #d8dfe9;
  border-radius: 50%;
  text-decoration: none;
}

.main-container {
  width: 65% !important;
}



</style>