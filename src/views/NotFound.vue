<template>
  <v-sheet class="h-100">
    <div class="container text-center">
      <div>
        <h1 class="font-bungee text-max-10">404</h1>
        <h1 class="font-rowdies">Oops! The page your requested could not be found</h1>
        <v-btn
          class="my-5 font-bungee"
          color="#8a0642"
          size="large"
          rounded
          variant="outlined"
          @click="() => handleRoute({ name: 'home' })"
        >
          go back
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<script lang="ts" setup>
import { handleRoute } from '@/helpers/loadingRoute'
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.text-max-10 {
  font-size: 10rem;
}
</style>