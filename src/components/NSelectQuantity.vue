<template>
  <v-select
    :label="propItems.label"
    :items="numberOptions"
    :disabled="propItems.disabled"
    density="compact"
    color="primary"
    hide-details="auto"
    variant="outlined"
    @update:modelValue="(event) => hanldeChange(event)"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { defineProps, withDefaults, defineEmits } from 'vue'
type Props = {
  quantity: number | null,
  label?: string,
  disabled?: boolean
}
const propItems = withDefaults(defineProps<Props>(), {
  quantity: 0,
  label: '',
  disabled: false
})
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()
const hanldeChange = (event: number) => {
  emit('update:modelValue', event)
}

const numberOptions = computed(() => {
  let arr = []
  if (propItems.quantity) {
    for (let i = 0; i <= propItems.quantity; i++) {
      arr.push(i)
    }
  }
  return arr
})

</script>