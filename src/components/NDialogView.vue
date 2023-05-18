<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog
    v-model="propItems.dialog"
    :fullscreen="propItems.fullScreen"
    :scrim="false"
    :transition="propItems.transition"
    :width="propItems.width"
  >
    <slot name="content" />
  </v-dialog>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  dialog: boolean,
  width: string,
  fullScreen: boolean,
  transition: string
}
const propItems = withDefaults(defineProps<Props>(), {
  dialog: true,
  width: '',
  fullScreen: false,
  transition: 'dialog-top-transition'
})
</script>