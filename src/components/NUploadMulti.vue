<template>
  <v-row>
    <v-col cols="2">
      <div class="d-flex align-center justify-center" style="width: 150px; height: 150px;border: 1px solid #000">
        <v-btn
          rounded
          variant="plain"
          icon="mdi-camera-enhance-outline"
          size="small"
          :loading="isSelecting"
          @click="handleFileImport"
        />
      </div>
      <v-file-input ref="uploader" class="d-none" multiple @update:modelValue="onFileChanged" />
    </v-col>
    <v-col cols="8">
      <v-sheet
        class="mx-auto"
        max-width="750"
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
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const isSelecting = ref<boolean>(false)
const uploader = ref()
const srcImg = ref<any[]>([])
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
  srcImg.value = []
  emit('update:modelValue', event)
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
</script>
