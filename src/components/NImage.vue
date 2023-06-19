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
    <template #default>
      <v-icon
        v-if="props.hasFav"
        color="primary"
        size="large"
        :icon="props.favorite ? 'mdi-heart' : 'mdi-cards-heart-outline'"
        class="icon-img"
        @click="hanldeChange"
      />
      <slot name="default" />
    </template>
  </v-img>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, ref, defineEmits } from 'vue'

type Props = {
  src?: string,
  colorProgress?: string,
  aspectRatio?: string,
  width?: string,
  height?: string,
  hasFav?: boolean,
  favorite?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  src: '',
  hasFav: false,
  favorite: false,
  colorProgress: 'grey-lighten-5',
  aspectRatio: '',
  width: '',
  height: ''
})
const emit = defineEmits(['addFavorite'])
const hanldeChange = () => {
  emit('addFavorite')
}

</script>
<style scoped>
  .icon-img {
    position: absolute;
    top: 0;
    margin: 7px
  }
</style>