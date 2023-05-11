import { onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'


const useHome = () => {
  const {
    hotels,
    recomendCities,
    selectedCity,
    getRecomendHotelByCity,
    getRecomendCities
  } = useHotelUtil()
  const { popularTours, getPopularTours } = useTourUtil()
  onMounted(async()=>{
    await getRecomendCities()
    getRecomendHotelByCity(selectedCity.value)
    await getPopularTours()

  })
  return {
    recomendCities,
    hotels,
    selectedCity,
    popularTours,
    getRecomendHotelByCity
  }
}
export const useHomeUtil = createSharedComposable(useHome)