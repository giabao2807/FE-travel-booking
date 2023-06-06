<template>
  <div>
    {{ selectedFile }}
    <v-btn
      rounded
      color="transparent"
      icon="mdi-camera-enhance-outline"
      class="btn"
      :loading="isSelecting"
      @click="handleFileImport"
    />
    <v-file-input ref="uploader" class="d-none" @update:modelValue="onFileChanged" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
const isSelecting = ref<boolean>(false)
const selectedFile = ref<string>('')
const uploader = ref()
const handleFileImport = () => {
  isSelecting.value = true
  window.addEventListener(
    'focus',
    () => { isSelecting.value = false },
    { once: true }
  )
  uploader.value.click()
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>()
const onFileChanged = (event: any) => {
  const data = new FormData()
  data.append('avatar', event[0])
  emit('update:modelValue', data)
}
</script>
<style scoped>
.btn:hover {
  color: var(--btn-animation-color);
}
</style>
