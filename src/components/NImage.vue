<template>
  <v-img
    :src="props.src"
    :lazy-src="props.src"
    :aspect-ratio="props.aspectRatio"
    :width="props.width"
    :height="props.height"
    cover
  >
    <template #placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          :color="colorProgress"
        />
      </v-row>
    </template>
    <slot />
  </v-img>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  src?: string,
  colorProgress?: string,
  aspectRatio?: string,
  width?: string,
  height?: string,
}
const props = withDefaults(defineProps<Props>(), {
  src: '',
  colorProgress: 'grey-lighten-5',
  aspectRatio: '',
  width: '',
  height: ''
})
</script>