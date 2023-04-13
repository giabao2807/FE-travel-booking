<template>
  <v-container class="fill-height container" fluid>
    <v-row class="ma-6" justify="end">
      <v-card min-width="40%" class="elevation-12 pa-5 feature-box" color="surface">
        <v-card-text class="mt-10">
          <v-img :src="require('@/assets/img/register-preview.png')" height="130" aspect-ratio="16/9" cover />
          <v-form class="pt-5" @submit.prevent="loginUser">
            <v-text-field
              v-model="user.username"
              label="Email"
              name="Email"
              prepend-inner-icon="mdi-shield-account-outline"
              type="text"
              color="primary-darken-1"
              variant="outlined"
              rounded
            />

            <v-text-field
              v-model="user.password"
              label="Password"
              name="password"
              prepend-inner-icon="mdi-lock-outline"
              type="password"
              color="primary-darken-1"
              variant="outlined"
              rounded
            />

            <v-text-field
              label="ConfirmPassword"
              name="confirmPassword"
              prepend-inner-icon="mdi-lock-outline"
              type="password"
              color="primary-darken-1"
              variant="outlined"
              rounded
            />
            <div class="text-center">
              <button type="submit" class="btn btn--pink btn--animated">SIGN IN</button>
              <h4 class="mt-5 font-weight-thin text-medium-emphasis">
                Already have an account?
                <router-link class="text-decoration-none" to="/login">Sign in</router-link>
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
import { ref } from 'vue'
import connectionsAPI from '@/plugins/axios'

const user = ref({
  username: '',
  password: ''
})

const loginUser = async() => {
  const response = await connectionsAPI({
    methods: 'POST',
    path: '/auth/login',
    headers: { 'Content-Type': 'application/json' },
    data: user.value,
    jwtToken: ''
  })
}
</script>
<style scoped>
</style>