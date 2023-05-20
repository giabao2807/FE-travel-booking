<template>
  <v-app class="font-serif">
    <n-app-loading />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script lang="ts" setup>
import NAppLoading from '@/components/NAppLoading.vue'

</script>
<style scoped>
.v-application .v-application--wrap * {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
}

</style>
