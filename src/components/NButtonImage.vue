<template>
  <v-avatar :size="size" @click="$emit('click', $event)">
    <v-img :src="require(url)" cover />
  </v-avatar>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
type Props = {
  size?: string,
  url: string,
}
const { size = 'x-small', url } = defineProps<Props>()
</script>