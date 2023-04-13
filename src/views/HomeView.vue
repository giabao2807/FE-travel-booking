<template>
  <div class="home">
    <v-button @click="ToLogin">Login in Here</v-button>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'

const ToLogin = () => {
  router.push('/sign_in')
}
</script>
