<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-pagination
    class="my-5"
    v-model="propItems.page"
    :total-visible="5"
    :length="propItems.length"
    @update:modelValue="() => handleAction()"
  />
</template>
<script lang="ts" setup>
import { defineEmits, withDefaults, defineProps } from 'vue'

type Props = {
  page: number,
  length: number
}
const emit = defineEmits(['changePage'])
const handleAction = () => {
  emit('changePage')
  window.scrollTo(0, 0)
}
const propItems = withDefaults(defineProps<Props>(), {
  page: 0,
  length: 0
})
</script>