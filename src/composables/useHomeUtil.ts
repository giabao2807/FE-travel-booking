import { onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'


const useHome = () => {
  const {
    hotels,
    recomendCities,
    selectedCity,
    getHotelByCity,
    getRecomendCities
  } = useHotelUtil()
  const { popularTours, getPopularTours } = useTourUtil()
  onMounted(async()=>{
    await getRecomendCities()
    getHotelByCity(selectedCity.value)
    await getPopularTours()
    console.log(popularTours.value)

  })
  return {
    recomendCities,
    hotels,
    selectedCity,
    popularTours,
    getHotelByCity
  }
}
export const useHomeUtil = createSharedComposable(useHome)