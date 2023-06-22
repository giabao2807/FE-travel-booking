<!-- eslint-disable vue/no-static-inline-styles -->
<template>
  <div class="d-flex align-center">
    <div>
      <div class="d-flex align-center justify-center border-dashed" style="width: 150px; height: 150px;">
        <v-btn
          rounded
          variant="plain"
          icon="mdi-camera-enhance-outline"
          size="small"
          :loading="isSelecting"
          @click="handleFileImport"
        />
      </div>
      <v-file-input :value="srcImgModel" ref="uploader" class="d-none" multiple @update:modelValue="event => onFileChanged(event)" />
    </div>
    <v-sheet
      class="my-2"
      :max-width="props.maxWidth"
    >
      <v-slide-group
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(item, index) in srcImg"
          :key="index"
        >
          <v-img :src="item" height="150" width="150" cover class="mx-2" />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, defineEmits, withDefaults, defineProps, watchEffect } from 'vue'

const isSelecting = ref<boolean>(false)
const uploader = ref()
const srcImg = ref<any[]>([])
const srcImgModel = ref<any[]>([])
type Props = {
  maxWidth?: string,
  dataImg?: any
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '750',
  dataImg: []
})
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
  emit('update:modelValue', event)
  srcImg.value = []
  if (event) {
    event.map((item: any) => {
      const fr = new FileReader()
      fr.readAsDataURL(item)
      fr.addEventListener('load', () => {
        fr.result ? srcImg.value.push(fr.result) : null
      })
    })
  }
}
watchEffect(() => {
  if (props.dataImg.length === 0) {
    srcImg.value = []
  }
})
</script>
