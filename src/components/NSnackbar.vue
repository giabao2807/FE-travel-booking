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
  title: string,
  isActived: boolean,
  timeout: string,
  color: string
}
const propItems = withDefaults(defineProps<Props>(), {
  timeout: '1000',
  title: '',
  isActived: true,
  color: '#000'
})
</script>