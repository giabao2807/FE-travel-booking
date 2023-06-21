<template>
  <Doughnut :data="revenue" :options="props.chartOptions" :width="250" />
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineProps, withDefaults, computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  chartOptions?: any,
  chartData?: any
}
const props = withDefaults(defineProps<Props>(), {
  chartOptions: () => {},
  chartData: () => {}
})
const revenue = computed(() => {
  const data = {
    labels: ['Tours', 'Hotels'],
    datasets: [
      {
        backgroundColor: ['rgb(255,163,158)', 'rgb(100,181,246)'],
        data: [props.chartData?.totalTour, props.chartData?.totalHotel]
      }
    ]
  }
  return data
})

</script>