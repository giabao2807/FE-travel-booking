<template>
  <v-avatar :size="props.size" @click="$emit('click', $event)">
    <v-img :src="require(props.url)" cover />
  </v-avatar>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
type Props = {
  size?: string,
  url: string,
}
const props = withDefaults(defineProps<Props>(), {
  size: 'x-small',
  url: ''
})
</script>