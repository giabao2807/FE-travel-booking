<template>
  <v-container class="fill-height container" fluid>
    <v-row class="mx-5" justify="end">
      <v-card min-width="36%" class="elevation-10 pa-5 pb-2 feature-box  rounded-xl rounded-be-0" color="surface">
        <v-card-text class="mt-5">
          <v-img :src="require('@/assets/img/signin.png')" height="110" aspect-ratio="16/9" cover />
          <v-form class="pt-5" @submit.prevent="signIn">
            <v-text-field
              v-model="userSignIn.email"
              label="Email"
              name="Email"
              prepend-inner-icon="mdi-shield-account-outline"
              type="text"
              color="primary"
              variant="outlined"
            />
            <v-text-field
              v-model="userSignIn.password"
              label="Password"
              name="password"
              prepend-inner-icon="mdi-lock-outline"
              :type="showPassword ? 'text' : 'password'"
              color="primary"
              variant="outlined"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
            />
            <div class="d-flex align-center flex-wrap ma-4">
              <v-checkbox v-model="rememberMe" hide-details label="Remember me" color="primary" class="mb-1" />
              <n-dialog textDialog="Forgot your password?" title="Forgot the password">
                <template #content>
                  <v-text-field
                    label="Email"
                    prepend-inner-icon="mdi-shield-account-outline"
                    type="text"
                    color="primary-darken-1"
                    variant="outlined"
                  />
                </template>
              </n-dialog>
            </div>
            <div class="text-center">
              <n-button-animated label="SIGN IN" />
              <div class="ma-4">
                <span class="double-line text-medium-emphasis">Or sign in with
                  <v-avatar class="btn-g" size="x-small" @click="signInWithGoogle">
                    <v-img :src="require('@/assets/img/google-logo.png')" cover />
                  </v-avatar>
                </span>
              </div>
              <h4 class="mt-5 font-weight-thin text-medium-emphasis">
                Don't have an account?
                <router-link class="text-decoration-none" to="/sign_up">Sign up now</router-link>
              </h4>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
    <n-snackbar :title="initError.message" />
  </v-container>
</template>
<script lang="ts" setup>
import '@/assets/css/signIn.css'
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import NDialog from '@/components/NDialog.vue'
import NSnackbar from '@/components/NSnackbar.vue'
import { useAuthentication } from '@/composables/useAuth'
const {
  userSignIn,
  showPassword,
  rememberMe,
  initError,
  signIn,
  signInWithGoogle,
  isRememberMe
} = useAuthentication()
</script>