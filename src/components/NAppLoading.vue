<template>
  <v-dialog
    v-model="loading"
    :scrim="false"
    persistent
    class="dialog"
  >
    <v-progress-circular class="align-self-center" color="primary" size="200" width="20" indeterminate />
  </v-dialog>
</template>
<script lang="ts" setup>
import { useLoading } from '@/composables/useLoading'
const { loading } = useLoading()
</script>

<style scoped>
.dialog {
  opacity: 0.8;
  background-color: var(--loading-bgcolor);
  border-color: var(--loading-border-color);
  z-index: 300;
}
</style>