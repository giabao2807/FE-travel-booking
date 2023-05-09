
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ICity = {
  id: number,
  name?: string
}
export type IHotel = {
  id: string,
  name: string,
  address: string,
  numReview: number,
  priceRange: string,
  coverPicture: string,
  rateAverage: number,
}
export const useHotelStore = defineStore('hotelStore', () => {
  const recomendCities = ref<ICity[]>([])
  const hotels = ref<IHotel[]>([])

  const getRecomendCities = async(amount = 10) =>{
    await connectionsAPI({
      methods: 'GET',
      path: 'general/city/top-recommend-cities',
      params: { amount: amount }
    }).then(data => recomendCities.value = data)
  }

  const getHotelByCity = async(cityId = 1) => {
    await connectionsAPI({
      methods: 'GET',
      path: `general/city/${cityId}/top-hotels`,
      params: { page_size: 8, page: 1 }
    }).then(data => hotels.value = data.results)
  }
  return {
    recomendCities,
    hotels,
    getRecomendCities,
    getHotelByCity
  }
})
