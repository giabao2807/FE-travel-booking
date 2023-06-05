<template>
  <div>
    {{ selectedFile }}
    <v-btn color="primary" rounded dark :loading="isSelecting" @click="handleFileImport">
      Upload File
    </v-btn>
    <v-file-input ref="uploader" class="d-none" @update:modelValue="onFileChanged"/>
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
    () => {
      isSelecting.value = false
    },
    { once: true }
  )
  uploader.value.click()
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
const onFileChanged = (event: any) => {
  console.log(event)
  emit('update:modelValue', event[0])
}
</script>
