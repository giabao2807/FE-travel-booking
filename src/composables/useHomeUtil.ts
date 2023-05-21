import { ref, computed, onMounted } from 'vue'
import { IFilterDate } from '@/libs/types/commonType'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'
import { PANEL_IMAGE } from '@/resources/mockData'
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
    getRecomendHotelByCity
  }
}
export const useHomeUtil = createSharedComposable(useHome)