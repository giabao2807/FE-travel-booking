import { ref, computed, onMounted } from 'vue'
import { IFilterDate } from '@/libs/types/commonType'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'
import { COMMENTRATE, PANEL_IMAGE } from '@/resources/mockData'
import { ICity } from '@/libs/types/tourType'

export type IImageCol = ICity & {
  col?: number
}
export type IFilterPanel = IFilterDate & {
  cityId: number
}
const useHome = () => {
  const filterPanel = ref<IFilterPanel>({
    cityId: 0,
    startDate: '',
    endDate: ''
  })
  const {
    hotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    getRecomendHotelByCity,
    getRecomendCities
  } = useHotelUtil()
  const {
    popularTours,
    allCities,
    getTraffic,
    getPopularTours,
    getAllCities
  } = useTourUtil()
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
    await getPopularTours()
    getRecomendHotelByCity(selectedCity.value)
    getAllCities()
    console.log(allCities)
  })

  return {
    recomendCities,
    hotels,
    selectedCity,
    popularTours,
    getCitiesPanel,
    loadingPanelHotel,
    allCities,
    filterPanel,
    getTraffic,
    voteText,
    getRecomendHotelByCity
  }
}
export const useHomeUtil = createSharedComposable(useHome)