<template>
  <v-card elevation="1" class="rounded-xl">
    <v-card-title>
      <h4>
        <v-icon :icon="props.icon" />
        {{ props.title }}
      </h4>
    </v-card-title>
    <v-card-text>
      <v-progress-linear
        :model-value="totalPercent(props.dataLinear)"
        height="15"
        class="rounded-xl my-5"
        striped
        :color="props.color"
      >
        <template #default="{ value }">
          <strong>{{ Math.round(value) || 0 }}%</strong>
        </template>
      </v-progress-linear>
      <div class="ma-2">
        <span class="my-2">From day {{ props.dateFrom }} to {{ props.dateTo }}</span>
        <br>
        <h3 class="my-2" :style="{ color: props.color }">Total price: {{ formatCurrency(props.dataLinear) }}</h3>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { convertionType } from '@/helpers/convertion'

const { formatCurrency } = convertionType()
type Props = {
  dataLinear: number,
  total: number
  title?: string,
  icon?: string,
  dateFrom?: string,
  dateTo?: string,
  color: string,
}
const props = withDefaults(defineProps<Props>(), {
  dataLinear: 0,
  total: 0,
  title: '',
  icon: '',
  dateFrom: '',
  dateTo: '',
  color: ''
})
const totalPercent = (item: number) => {
  return item / props.total * 100
}
</script>