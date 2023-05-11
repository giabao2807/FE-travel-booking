<template>
  <div>
    <h2>{{ hotel?.name }}</h2>
    <div v-html="hotel?.descriptions" />
    <v-sheet>
      <div v-for="room in roomTypes" :key='room?.id'>
        <span>{{ room?.name }}</span>
        <p v-html="room?.description" />
      </div>
    </v-sheet>
  </div>
</template>
<script lang="ts" setup>
import { useHotelUtil } from '@/composables/useHotel'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const hotelId = route.params.id as string
const { hotel, roomTypes, getHotelById } = useHotelUtil()
onMounted(() => {
  getHotelById(hotelId)
})
</script>