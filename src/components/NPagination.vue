<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-pagination
    class="my-5"
    :total-visible="5"
    :length="propItems.length"
    :density="propItems.compact ? 'compact' : undefined"
    color="primary"
    @update:modelValue="(event) => handleAction(event)"
  />
</template>
<script lang="ts" setup>
import { defineEmits, withDefaults, defineProps } from 'vue'

type Props = {
  length: number,
  compact?: boolean
}
const emit = defineEmits<{
  (event: 'change'): void
  (event: 'update:modelValue', id: number): void
}>()
const handleAction = (event: number) => {
  emit('update:modelValue', event)
  emit('change')
  window.scrollTo(0, 0)
}
const propItems = withDefaults(defineProps<Props>(), {
  length: 0,
  compact: false
})
</script>