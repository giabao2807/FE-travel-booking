<template>
  <default-latyout />
</template>

<script lang="ts" setup>
import router from '@/router'
import DefaultLatyout from '@/layouts/DefaultLatyout.vue'

const ToLogin = () => {
  router.push('/sign_in')
}
</script>
