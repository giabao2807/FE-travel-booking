<template>
  <line-chart
    :options="props.chartOptions"
    :data="props.chartData"
    :dataset-id-key="props.datasetIdKey"
    :plugins="props.plugins"
    :css-classes="props.cssClasses"
    :width="props.width"
    :height="props.height"
  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement)

type Props = {
  datasetIdKey: string,
  width: number,
  height: number,
  cssClasses: string,
  plugins: any,
  chartOptions: any,
  chartData: any
}
const props = withDefaults(defineProps<Props>(), {
  datasetIdKey: 'label',
  width: undefined,
  height: undefined,
  cssClasses: '',
  plugins: () => [],
  chartOptions: () => {},
  chartData: () => {}
})
</script>

