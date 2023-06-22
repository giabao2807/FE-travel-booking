<template>
  <v-dialog
    v-model="loading"
    :scrim="false"
    persistent
    fullscreen
    class="dialog"
  >
    <v-row class="pa-0 ma-0" align="center" justify="center">
      <el-icon class="is-loading align-self-center" color="var(--el-color-primary)" :size="80">
        <loading-icon />
      </el-icon>
    </v-row>
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
  z-index: 300;
}
</style>