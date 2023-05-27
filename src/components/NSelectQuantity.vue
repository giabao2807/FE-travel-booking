<template>
  <v-select
    :items="numberOptions"
    density="compact"
    color="primary"
    hide-details="auto"
    class="text-field"
    variant="outlined"
    @update:modelValue="(event) => hanldeChange(event)"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { defineProps, withDefaults, defineEmits } from 'vue'
type Props = {
  quantity: number
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()
const hanldeChange = (event: number) => {
  emit('update:modelValue', event)
}
const propItems = withDefaults(defineProps<Props>(), {
  quantity: 1
})
const numberOptions = computed(() => {
  let arr = []
  for (let i = 1; i <= propItems.quantity; i++){
    arr.push(i)
  }
  return arr
})

</script>