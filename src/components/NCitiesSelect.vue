<template>
  <v-autocomplete
    v-model="cityId"
    :items="allCities"
    label="City"
    name="city"
    color="primary"
    :density="propItems.compact ? 'compact' : undefined"
    :prepend-icon="propItems.prependIcon"
    :prepend-inner-icon="propItems.prependInnerIcon"
    item-title="name"
    item-value="id"
    hide-details="auto"
    placeholder="Select city"
    :variant="propItems.variant"
    @update:modelValue="(event) => hanldeChange(event)"
  />
</template>
<script lang="ts" setup>
import { defineEmits, ref, withDefaults, defineProps } from 'vue'
import { useCities } from '@/composables/useCities'

const { allCities } = useCities()
type Props = {
  prependIcon?: string,
  prependInnerIcon?: string,
  variant?: 'underlined' | 'filled' | 'outlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled',
  compact?: boolean
}
const emit = defineEmits<{
  (event: 'update:modelValue', id: number): void
}>()
const hanldeChange = (event: number) => {
  emit('update:modelValue', event)
}
const cityId = ref<number>()
const propItems = withDefaults(defineProps<Props>(), {
  prependIcon: '',
  prependInnerIcon: '',
  variant: 'underlined',
  compact: false
})
</script>