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
        v-if="props.hasFav && isSignIn"
        color="error"
        size="large"
        :icon="props.favorite ? 'mdi-heart' : 'mdi-cards-heart-outline'"
        :class="props.favorite ? 'icon-img icon-fav' : 'icon-img'"
        @click="() => {
          props.favorite ? hanldeRemove() : hanldeChange()
        }"
      />
      <slot name="default" />
    </template>
  </v-img>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue'
import { checkInfo } from '@/helpers/checkSignIn'

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
const { isSignIn } = checkInfo()
const emit = defineEmits(['addFavorite', 'removeFavorite'])
const hanldeChange = () => {
  emit('addFavorite')
}
const hanldeRemove = () => {
  emit('removeFavorite')
}

</script>
<style scoped>
.icon-img {
  position: absolute;
  top: 0;
  margin: 9px;
}
.icon-fav {
  scale: 1.2;
  animation: float 0.8s infinite alternate-reverse ease-in-out;
  transition: all 0.4s cubic-bezier(0.680, -0.550, 0.265, 1.550);
}
@keyframes float {
  to {
    translate: 0 -0.3rem;
  }
}
</style>