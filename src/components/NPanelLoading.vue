<template>
  <div v-if="loading" class="v-overlay v-overlay--active theme--dark dialog">
    <v-progress-circular color="primary" size="100" width="20" indeterminate />
  </div>
</template>
<script lang="ts" setup>
import { usePanelLoading } from '@/composables/usePanelLoading'
const { loading } = usePanelLoading()
</script>

<style scoped>
.dialog {
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  z-index: 9999;
}
</style>