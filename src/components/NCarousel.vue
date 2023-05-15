<template>
  <v-carousel
    :height="props.height"
    cycle
    :show-arrows="props.showArrows"
    :hide-delimiters="props.hideDelimiters"
    :hide-delimiter-background="props.hideDelimiterBackground"
  >
    <v-carousel-item
      v-for="(item, i) in props.data"
      :key="i"
      :src="item"
      cover
    />
    <template #placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          :color="props.colorProgress"
        />
      </v-row>
    </template>
  </v-carousel>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'

type Props = {
  data: string[],
  colorProgress?: string,
  width?: string,
  height?: string,
  showArrows?: string | boolean,
  hideDelimiters: boolean,
  hideDelimiterBackground: boolean
}
const props = withDefaults(defineProps<Props>(), {
  date: [],
  colorProgress: 'grey-lighten-5',
  width: '',
  height: '',
  showArrows: 'hover',
  hideDelimiters: true,
  hideDelimiterBackground: true
})
</script>