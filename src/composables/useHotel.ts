import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from './useLoading'

const useHotel = () => {
  const hotelStore = useHotelStore()
  const { recomendCities, hotels } = storeToRefs(hotelStore)
  const { startLoading, finishLoading } = useLoading()
  const selectedCity = ref<number>(0)
  const getRecomendCities = async() => {
    startLoading()
    await hotelStore.getRecomendCities()
    selectedCity.value = recomendCities.value[0]?.id
    finishLoading()
  }
  const getHotelByCity = async(cityId: number) => {
    await hotelStore.getHotelByCity(cityId)
  }
  return {
    hotels,
    recomendCities,
    selectedCity,
    getHotelByCity,
    getRecomendCities
  }
}
export const useHotelUtil = createSharedComposable(useHotel)