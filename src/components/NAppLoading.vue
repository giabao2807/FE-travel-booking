<template>
  <v-dialog
    v-model="loading"
    :scrim="false"
    persistent
    class="dialog"
  >
    <el-icon class="is-loading align-self-center" color="var(--el-color-primary)" :size="100">
      <loading-icon />
    </el-icon>
  </v-dialog>
</template>
<script lang="ts" setup>
import { useLoading } from '@/composables/useLoading'
import { Loading as LoadingIcon } from '@element-plus/icons-vue'
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