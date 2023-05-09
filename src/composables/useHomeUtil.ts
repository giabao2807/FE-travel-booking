import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from './useLoading'

const useHome = () => {
  const hotelStore = useHotelStore()
  const { recomendCities, hotels } = storeToRefs(hotelStore)
  const { startLoading, finishLoading } = useLoading()
  console.log(recomendCities.value)
  const selectedCity = ref<number>(0)
  const getRecomendCities = async() => {
    startLoading()
    await hotelStore.getRecomendCities()
    selectedCity.value = recomendCities.value[0]?.id
    finishLoading()
  }
  const getHotelByCity = async(cityId: number) => {
    startLoading()
    await hotelStore.getHotelByCity(cityId)
    finishLoading()
  }
  onMounted(async()=>{
    await getRecomendCities()
    getHotelByCity(selectedCity.value)
  })
  return {
    recomendCities,
    selectedCity,
    getHotelByCity,
    hotels
  }
}
export const useHomeUtil = createSharedComposable(useHome)