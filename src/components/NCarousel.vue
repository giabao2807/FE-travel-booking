<template>
  <v-carousel
    cycle
    :height="props.height"
    :show-arrows="props.showArrows"
    :hide-delimiters="props.hideDelimiters"
    :hide-delimiter-background="props.hideDelimiterBackground"
  >
    <v-carousel-item
      v-for="(item, i) in props.data"
      :key="i"
      :src="item"
      :lazy-src="item"
      cover
      eager
    >
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
      <template #default>
        <slot name="default" />
      </template>
    </v-carousel-item>
  </v-carousel>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'

type Props = {
  data: string[],
  height: string,
  colorProgress?: string,
  showArrows?: string | boolean,
  hideDelimiters?: boolean,
  hideDelimiterBackground?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  colorProgress: 'primary',
  showArrows: 'hover',
  hideDelimiters: true,
  hideDelimiterBackground: true
})
</script>