<template>
  <div>
    <v-img :src="srcImg || props.dataImg" height="150" width="150" cover style="border: 1px solid #000">
      <div class="d-flex align-center justify-center fill-height">
        <v-btn
          rounded
          variant="plain"
          size="small"
          icon="mdi-camera-enhance-outline"
          :loading="isSelecting"
          @click="handleFileImport"
        />
      </div>
    </v-img>
    <v-file-input ref="uploader" class="d-none" @update:modelValue="onFileChanged" />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, withDefaults, defineProps } from 'vue'

type Props = {
  dataImg: string,
}
const props = withDefaults(defineProps<Props>(), {
  dataImg: ''
})
const isSelecting = ref<boolean>(false)
const uploader = ref()
const srcImg = ref()
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event: 'update:modelValue', value: any): void
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFileChanged = (event: any) => {
  const fr = new FileReader()
  emit('update:modelValue', event[0])
  if (event) {
    fr.readAsDataURL(event[0])
    fr.addEventListener('load', () => {
      srcImg.value = fr.result
    })
  }
}
</script>
