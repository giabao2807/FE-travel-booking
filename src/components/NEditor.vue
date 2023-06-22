<template>
  <ckeditor
    :editor="editor"
    @update:modelValue="(event) => hanldeChange(event)"
    :config="editorConfig"
  />
</template>
<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineEmits } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>()
const hanldeChange = (event: any) => {
  emit('update:modelValue', event)
}
const editor = ClassicEditor
const editorConfig = {
  ckfinder: {
    uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
    options: {
      resourceType: 'Images'
    }
  },
  mediaEmbed: {
    previewsInData: true
  }
}
</script>
<style>
.ck-editor__editable {
  height: 200px;
}
</style>