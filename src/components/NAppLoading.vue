<template>
  <div v-if="loading" class="v-overlay v-overlay--active theme--dark dialog">
    <v-progress-circular color="primary" size="200" width="20" indeterminate />
  </div>
</template>
<script lang="ts" setup>
import { useLoading } from '@/composables/useLoading'
const { loading } = useLoading()
</script>

<style scoped>
.dialog {
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  background-color: var(--loading-bgcolor);
  border-color: var(--loading-border-color);
  z-index: 300;
}
</style>