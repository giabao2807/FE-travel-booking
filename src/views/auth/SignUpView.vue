<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <v-container class="fill-height container-auth" fluid>
    <div style="position: absolute; top: 0;">
      <img
        src="@/assets/img/logo.svg" alt="SVG Image" @click="() => {
          handleRoute({ name: 'homepage' })
        }"
      >
    </div>
    <v-row class="mx-5" justify="end">
      <v-card min-width="38%" class="elevation-10 pa-5 pb-2 box-sign-up rounded-xl rounded-be-0" color="surface">
        <v-card-text>
          <n-image :src="require('@/assets/img/signup.png')" height="110" aspect-ratio="16/9" />
          <v-form ref="formRef" class="pt-5" @submit.prevent="signUp">
            <div class="d-flex align-center flex-wrap mb-n2">
              <v-text-field
                v-model="userSignUp.firstName"
                :rules="nameRules"
                label="FirstName"
                name="firstName"
                prepend-inner-icon="mdi-shield-account-outline"
                type="text"
                color="primary"
                variant="outlined"
                hide-details="auto"
                class="text-field mr-3"
                clearable
              />
              <v-text-field
                v-model="userSignUp.lastName"
                :rules="nameRules"
                label="LastName"
                name="lastName"
                type="text"
                color="primary"
                variant="outlined"
                hide-details="auto"
                class="text-field"
                clearable
              />
            </div>
            <v-text-field
              v-model="userSignUp.email"
              :rules="[ruleEmail(userSignUp.email), ruleRequired('Email')]"
              label="Email"
              name="Email"
              prepend-inner-icon="mdi-email-outline"
              type="text"
              color="primary"
              variant="outlined"
              hide-details="auto"
              class="text-field"
              clearable
            />
            <v-select
              v-model="userSignUp.gender"
              :rules="[ruleRequired('Giới tính')]"
              :items="GENDER_DATA"
              item-title="name"
              item-value="value"
              prepend-inner-icon="mdi-gender-male-female"
              label="Gender"
              color="primary"
              hide-details="auto"
              class="text-field"
              variant="outlined"
              clearable
            />
            <v-text-field
              v-model="userSignUp.password"
              :rules="[ruleRequired('Password'), ruleLength('Password', 8)]"
              label="Password"
              name="password"
              prepend-inner-icon="mdi-lock-outline"
              :type="showPassword ? 'text' : 'password'"
              color="primary"
              variant="outlined"
              hide-details="auto"
              class="text-field"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              clearable
              @click:append-inner="showPassword = !showPassword"
            />
            <v-text-field
              v-model="userSignUp.passwordConfirm"
              :rules="[ruleRequired('ConfirmPassword'), ruleConfirmPassword(userSignUp.password, userSignUp.passwordConfirm)]"
              label="ConfirmPassword"
              name="confirmPassword"
              prepend-inner-icon="mdi-lock-outline"
              :type="showPassword ? 'text' : 'password'"
              color="primary"
              variant="outlined"
              hide-details="auto"
              class="text-field"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              clearable
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
            />
            <div class="text-center">
              <n-button-animated label="Sign Up" />
              <h4 class="mt-2 font-weight-thin text-medium-emphasis">
                Bạn đã đăng ký?
                <router-link class="text-decoration-none" to="/sign_in">Đăng nhập</router-link>
              </h4>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import NButtonAnimated from '@/components/NButtonAnimated.vue'
import NImage from '@/components/NImage.vue'
import { useAuthentication } from '@/composables/useAuth'
import { validations } from '@/helpers/validate'
import { onMounted } from 'vue'
import { handleRoute } from '@/helpers/loadingRoute'

const { ruleRequired, ruleEmail, nameRules, ruleConfirmPassword, ruleLength } = validations()
const {
  formRef,
  userSignUp,
  showPassword,
  showConfirmPassword,
  GENDER_DATA,
  routeDirectional,
  signUp
} = useAuthentication()
onMounted(() => {
  routeDirectional()
})
</script>
<style lang="css" scoped>
@import '@/assets/css/signIn.css';
</style>