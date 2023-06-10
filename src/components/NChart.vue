<template>
  <line-chart
    :options="props.chartOptions"
    :data="revenue"
    :plugins="props.plugins"
    :css-classes="props.cssClasses"
    :width="props.width"
    :height="props.height"
  />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, computed } from 'vue'
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
import moment from 'moment'

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
const defaultStyle = {
  pointStyle: 'circle',
  tension: 0.2,
  pointRadius: 10,
  pointHoverRadius: 15
}
const revenue = computed(() => {
  const dataChartTour: any[] = []
  const dataChartHotel: any[] = []
  const dataLabel : any[] = []
  props.chartData?.forEach((item: any) => {
    dataLabel.push(moment(item.day).format('DD/MM'))
    dataChartTour.push(item.tour)
    dataChartHotel.push(item.hotel)
  })
  const data = {
    labels: dataLabel,
    datasets: [
      {
        label: 'Tour',
        backgroundColor: 'rgb(255,163,158,0.5)',
        borderColor: 'rgb(255,163,158)',
        ...defaultStyle,
        data: dataChartTour
      },
      {
        label: 'Hotel',
        backgroundColor: 'rgb(100,181,246, 05)',
        borderColor: 'rgb(100,181,246)',
        ...defaultStyle,
        data: dataChartHotel
      }
    ]
  }
  return data
})


</script>

