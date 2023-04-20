<template>
  <v-container class="fill-height container" fluid>
    <v-row class="mx-5" justify="end">
      <v-card min-width="36%" class="elevation-10 pa-5 pb-2 feature-box  rounded-xl rounded-be-0" color="surface">
        <v-card-text class="mt-5">
          <v-img :src="require('@/assets/img/signin.png')" height="110" aspect-ratio="16/9" cover />
          <v-form class="pt-5" @submit.prevent="signIn">
            <v-text-field
              v-model="userSignIn.username"
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
              <v-checkbox v-model="rememberMe" hide-details label="Remember me" color="primary-darken-1" />
              <v-dialog
                transition="dialog-top-transition"
                width="30%"
              >
                <template #activator="{ props }">
                  <a v-bind="props">Forgot your password ?</a>
                </template>
                <template #default="{ isActive }">
                  <v-card>
                    <v-toolbar
                      color="primary"
                      title="Forgot the password"
                    />
                    <v-card-text>
                      <v-text-field
                        label="Email"
                        prepend-inner-icon="mdi-shield-account-outline"
                        type="text"
                        color="primary-darken-1"
                        variant="outlined"
                      />
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        variant="text"
                        @click="isActive.value = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        variant="text"
                        @click="isActive.value = false"
                      >
                        Set new password
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
            <div class="text-center">
              <n-button-animated label="SIGN IN" />
              <div class="ma-4">
                <span class="double-line text-medium-emphasis">Or sign in with
                  <v-avatar size="x-small" @click="signInWithGoogle">
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
  </v-container>
</template>
<script lang="ts" setup>
import '@/assets/css/login.css'
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import { useAuthentication } from '@/composables/useAuth'
const {
  userSignIn,
  showPassword,
  rememberMe,
  signIn,
  signInWithGoogle,
  isRememberMe
} = useAuthentication()
</script>
<style scoped>
.double-line::before,
.double-line::after {
  content: "";
  display: inline-block;
  border-top: 1px solid;
  width: 50px;
  margin: 3px 10px;
}
</style>