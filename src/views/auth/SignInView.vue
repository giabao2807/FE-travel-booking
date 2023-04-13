<template>
  <v-container class="fill-height container" fluid>
    <v-row class="mx-5" justify="end">
      <v-card min-width="36%" class="elevation-10 pa-5 pb-2 feature-box  rounded-xl rounded-be-0" color="surface">
        <v-card-text class="mt-5">
          <v-img :src="require('@/assets/img/login-preview.png')" height="110" aspect-ratio="16/9" cover />
          <v-form class="pt-5" @submit.prevent="loginUser">
            <v-text-field
              v-model="userSignIn.username"
              label="Email"
              name="Email"
              prepend-inner-icon="mdi-shield-account-outline"
              type="text"
              color="primary-darken-1"
              variant="outlined"
            />
            <v-text-field
              v-model="userSignIn.password"
              label="Password"
              name="password"
              prepend-inner-icon="mdi-lock-outline"
              :type="showPassword ? 'text' : 'password'"
              color="primary-darken-1"
              variant="outlined"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
            />
            <div class="d-flex align-center flex-wrap ma-4">
              <v-checkbox hide-details label="Remember me" />
              <a>Forgot your password ?</a>
            </div>
            <div class="text-center">
              <n-button-animated label="SIGN IN" />
              <h4 class="mt-5 font-weight-thin text-medium-emphasis">
                Don't have an account?
                <router-link class="text-decoration-none" to="/register">Sign up now</router-link>
              </h4>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import '@/assets/css/login.css'
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoading } from '@/composables/useLoading'

const authStore = useAuthStore()
const { userSignIn } = storeToRefs(authStore)
const { startLoading, finishLoading } = useLoading()
const showPassword = ref<boolean>(false)

const loginUser = async() => {
  startLoading()
  await authStore.signInUser()
  finishLoading()
  router.push('/dashboard')
}
</script>
<style scoped>
</style>