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
      <v-file-input ref="uploader" class="d-none" multiple @update:modelValue="onFileChanged" />
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
import { ref, defineEmits, withDefaults, defineProps } from 'vue'

const isSelecting = ref<boolean>(false)
const uploader = ref()
const srcImg = ref<any[]>([])
type Props = {
  maxWidth?: string,
}
const props = withDefaults(defineProps<Props>(), {
  maxWidth: '750'
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
