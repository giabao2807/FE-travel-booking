<template>
  <div class="container">
    <v-card class="p-6">
      <ckeditor
        :editor="editor"
        @update:modelValue="(event) => hanldeChange(event)"
        :config="editorConfig"
      />
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (event: 'update:modelValue', booking: boolean): void
}>()
const hanldeChange = (event: boolean) => {
  emit('update:modelValue', event)
}
const editor = ClassicEditor
const editorConfig = {
  // The configuration of the editor.
  fillEmptyBlocks: false,
  basicEntities: false,
  entities: false,
  entities_greek: false,
  entities_latin: false,
  language: 'fr',
  wordCount: {
    container: document.getElementById('wordcount')
  },
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
  min-height: 200px;
}
</style>