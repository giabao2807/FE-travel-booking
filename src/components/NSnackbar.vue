<template>
  <v-snackbar
    :timeout="propItems.timeout"
    :color="propItems.color"
  >
    {{ propItems.title.toUpperCase() }}
    <template #actions>
      <v-btn
        color="blue"
        variant="text"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
type Props = {
  isActived: boolean,
  title: string,
  timeout: string,
  color: string
}
const propItems = withDefaults(defineProps<Props>(), {
  isActived: false,
  timeout: '1000',
  title: '',
  color: '#000'
})
</script>