<template>
  <v-container class="text-center my-5">
    <p>
      <v-icon :icon="props.icon" />
      {{ props.title }}
    </p>
  </v-container>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  title?: string,
  icon?: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  icon: ''
})
</script>

