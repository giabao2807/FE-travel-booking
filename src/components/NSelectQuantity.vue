<template>
  <v-select
    :label="propItems.label"
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
  quantity: number,
  label?: string,
}
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()
const hanldeChange = (event: number) => {
  emit('update:modelValue', event)
}
const propItems = withDefaults(defineProps<Props>(), {
  quantity: 1,
  label: ''
})
const numberOptions = computed(() => {
  let arr = []
  for (let i = 0; i <= propItems.quantity; i++){
    arr.push(i)
  }
  return arr
})

</script>