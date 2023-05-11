<template>
  <div>
    this is tour detail
    <h1>{{ tour?.name }}</h1>
    <div v-html="tour?.descriptions" />
    <div v-html="tour?.note" />
    <div v-html="tour?.scheduleContent" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTourUtil } from '@/composables/useTour'

const route = useRoute()
const tourId = route.params.id as string
const { tour, getTourById } = useTourUtil()
onMounted(async() => {
  await getTourById(tourId)
})
</script>