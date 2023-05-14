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
  const { popularTours, getTraffic, getPopularTours } = useTourUtil()
  const COMMENTRATE = [
    { icon: 'mdi-heart-multiple-outline', name: 'Tuyệt vời' },
    { icon: 'mdi-heart-plus-outline', name:  'Ấn Tượng' },
    { icon: 'mdi-like-outline', name:  'Bình Thường' },
    { icon: 'mdi-emoticon-sad-outline', name:  'Tệ' }
  ]
  const voteText = (rate: number) => {
    if (rate > 4.5) {
      return COMMENTRATE[0]
    }
    else if (rate >= 4) {
      return COMMENTRATE[1]
    }
    else if (rate >= 3) {
      return COMMENTRATE[2]
    }
    return COMMENTRATE[3]
  }

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
    getTraffic,
    voteText,
    getRecomendHotelByCity
  }
}
export const useHomeUtil = createSharedComposable(useHome)