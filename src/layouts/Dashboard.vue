<template>
  <v-sheet>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      rail
      color="surface"
    >
      <v-list>
        <v-list-item
          :prepend-avatar="authUser?.avatar"
          :title="authUser?.fullName"
          :subtitle="authUser?.email"
        />
      </v-list>
      <v-divider />
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles" />
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" />
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
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
      <h4 class="blue--text text--lighten-2">Appointments history</h4>
      <v-icon color="#2784FF" class="ml-2 mr-2">
        fas fa-caret-down
      </v-icon>
      <v-icon color="primary" icon="mdi-lightbulb-night" @click="toggleTheme" />
      <v-badge dot color="green" class="ml-3 mr-2">
        <v-avatar color="#E5F1FF">
          <v-icon color="#2784FF">fas fa-bell</v-icon>
        </v-avatar>
      </v-badge>
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
<style>
.border {
  margin-left: 12px;
  margin-right: 12px;
  background: #d8dfe9;
  border-radius: 50%;
  text-decoration: none;
}
.v-list-item-group .v-list-item--active {
  color: white !important;
}

</style>