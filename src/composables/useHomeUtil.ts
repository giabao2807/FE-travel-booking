import { computed, onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'
import { COMMENTRATE, PANEL_IMAGE } from '@/resources/mockData'
import { ICity } from '@/store/hotels'
export type IImageCol = ICity & {
  col?: number
}
const useHome = () => {
  const {
    hotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    getRecomendHotelByCity,
    getRecomendCities
  } = useHotelUtil()
  const { popularTours, getTraffic, getPopularTours } = useTourUtil()
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
  const getCitiesPanel = computed(() => {
    const citiesCols: IImageCol[] = []
    recomendCities.value?.slice(0, 5).forEach((item, index) => citiesCols.push({ ...PANEL_IMAGE[index], ...item }))
    return citiesCols
  })
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
    getCitiesPanel,
    loadingPanelHotel,
    getTraffic,
    voteText,
    getRecomendHotelByCity
  }
}
export const useHomeUtil = createSharedComposable(useHome)