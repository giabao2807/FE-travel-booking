<template>
  <v-container class="fill-height container-auth" fluid>
    <v-row class="mx-5" justify="end">
      <v-card min-width="36%" class="elevation-10 pa-5 pb-2 feature-box  rounded-xl rounded-be-0" color="surface">
        <v-card-text class="mt-5">
          <n-image :src="require('@/assets/img/signin.png')" height="110" aspect-ratio="16/9" />
          <v-form ref="formRef" class="pt-5" @submit.prevent="signIn">
            <v-text-field
              v-model="userSignIn.email"
              :rules="[ruleEmail(userSignIn.email), ruleRequired('Email')]"
              label="Email"
              name="Email"
              prepend-inner-icon="mdi-shield-account-outline"
              type="text"
              color="primary"
              hide-details="auto"
              class="text-field"
              variant="outlined"
            />
            <v-text-field
              v-model="userSignIn.password"
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
              @click:append-inner="showPassword = !showPassword"
            />
            <div class="d-flex align-center flex-wrap ma-4">
              <v-checkbox v-model="rememberMe" hide-details label="Ghi nhớ tài khoản" color="primary" class="mb-1" />
              <n-dialog
                title="Forgot the password"
                width="300"
                @action-second="() => forgotPassword(emailForgot)"
              >
                <template #btnDialog>
                  <a>Quên mật khẩu ?</a>
                </template>
                <template #content>
                  <v-text-field
                    v-model="emailForgot"
                    label="Email"
                    :rules="[ruleEmail(emailForgot), ruleRequired('Email')]"
                    prepend-inner-icon="mdi-shield-account-outline"
                    type="text"
                    color="primary-darken-1"
                    variant="outlined"
                  />
                </template>
              </n-dialog>
            </div>
            <div class="text-center">
              <n-button-animated label="Sign In" />
              <div class="ma-4">
                <span class="double-line text-medium-emphasis">Hoặc đăng nhập với:
                </span>
              </div>
              <GoogleLogin :callback="googleSignInCallBack" />
              <h4 class="mt-5 font-weight-thin text-medium-emphasis">
                Bạn chưa có tài khoản?
                <router-link class="text-decoration-none" to="/sign_up">Đăng ký</router-link>
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
import NDialog from '@/components/NDialog.vue'
import NImage from '@/components/NImage.vue'
import { useAuthentication } from '@/composables/useAuth'
import { validations } from '@/helpers/validate'
import { onMounted } from 'vue'
import { googleOneTap } from 'vue3-google-login'

const { ruleRequired, ruleEmail, ruleLength } = validations()
const {
  userSignIn,
  googleSignIn,
  showPassword,
  rememberMe,
  formRef,
  emailForgot,
  signIn,
  signInWithGoogle,
  routeDirectional,
  forgotPassword
} = useAuthentication()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const googleSignInCallBack = (response: any) => {
  googleSignIn.value.token = response.credential
  signInWithGoogle()
}
onMounted(() => {
  routeDirectional()
  googleOneTap()
    .then((response) => {
      googleSignInCallBack(response)
    })
    .catch((error) => { console.log('Handle the error', error) })
})
</script>
<style scoped>
@import '@/assets/css/signIn.css';
</style>