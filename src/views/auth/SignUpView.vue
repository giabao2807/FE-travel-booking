<template>
  <v-container class="fill-height container" fluid>
    <v-row class="mx-5" justify="end">
      <v-card min-width="38%" class="elevation-10 pa-5 pb-2 box-sign-up rounded-xl rounded-be-0" color="surface">
        <v-card-text>
          <v-img :src="require('@/assets/img/signup.png')" height="110" aspect-ratio="16/9" cover />
          <v-form class="pt-5" @submit.prevent="signUp">
            <div class="d-flex align-center flex-wrap">
              <v-text-field
                label="FirstName"
                name="firstName"
                prepend-inner-icon="mdi-shield-account-outline"
                type="text"
                color="primary"
                variant="outlined"
                class="pr-2"
                clearable
              />
              <v-text-field
                label="LastName"
                name="lastName"
                type="text"
                color="primary"
                variant="outlined"
                clearable
              />
            </div>
            <v-text-field
              v-model="userSignIn.username"
              label="Email"
              name="Email"
              prepend-inner-icon="mdi-email-outline"
              type="text"
              color="primary"
              variant="outlined"
              clearable
            />
            <v-select
              :items="GENDER_DATA"
              item-title="name"
              item-value="value"
              prepend-inner-icon="mdi-gender-male-female"
              label="Gender"
              color="primary"
              variant="outlined"
              clearable
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
              clearable
              @click:append-inner="showPassword = !showPassword"
            />
            <v-text-field
              label="ConfirmPassword"
              name="confirmPassword"
              prepend-inner-icon="mdi-lock-outline"
              type="password"
              color="primary"
              variant="outlined"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              clearable
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
            />
            <div class="text-center">
              <n-button-animated label="SIGN UP" />
              <div class="ma-4">
                <span class="double-line text-medium-emphasis">Or sign up with
                  <v-avatar size="x-small" @click="signUpWithGoogle">
                    <v-img :src="require('@/assets/img/google-logo.png')" cover />
                  </v-avatar>
                </span>
              </div>
              <h4 class="mt-2 font-weight-thin text-medium-emphasis">
                Already have an account?
                <router-link class="text-decoration-none" to="/sign_in">Sign in</router-link>
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
  showConfirmPassword,
  GENDER_DATA,
  signUp,
  signUpWithGoogle
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