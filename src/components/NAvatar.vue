<template>
  <v-avatar class="avatar-style" :image="props.image" :size="props.size" />
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  image?: string,
  size?: string
}
const props = withDefaults(defineProps<Props>(), {
  image: '',
  size: ''
})
</script>
<style lang="scss" scoped>
.avatar-style {
  -webkit-mask-image: url("@/assets/img/avatar-bg.png");
    mask-image: url("@/assets/img/avatar-bg.png");
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
}
</style>
