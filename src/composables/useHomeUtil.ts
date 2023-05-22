import { hanldeRoute } from '@/helpers/loadingRoute'
import { ref, computed, onMounted } from 'vue'
import { ICity, IFilterDate } from '@/libs/types/commonType'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'
import { PANEL_IMAGE } from '@/resources/mockData'

export type IImageCol = ICity & {
  col?: number
}
export type IFilterPanel = IFilterDate & {
  cityId: number
}
const useHome = () => {
  const filterPanel = ref<IFilterPanel>({
    cityId: 1,
    startDate: '',
    endDate: ''
  })
  const flagSearch = ref<string>('Tours')
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

  const filterTourAndHotel = () => {
    if (flagSearch.value === 'Tours') {
      return hanldeRoute({ name: 'tours' })
    }
    return hanldeRoute({ name: 'hotels' })
  }

  const countDate = computed(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    if (filterPanel.value.startDate && filterPanel.value.endDate) {
      const startDate = new Date(filterPanel.value.startDate)
      const endDate = new Date(filterPanel.value.endDate)
      const time = Math.abs(startDate.getTime() - endDate.getTime())
      return Math.round(time / ONE_DAY)
    }
    return null
  })

  const changeEndDate = () => {
    filterPanel.value.endDate = ''
  }

  onMounted(async() => {
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
    flagSearch,
    countDate,
    getTraffic,
    getRecomendHotelByCity,
    filterTourAndHotel,
    changeEndDate
  }
}
export const useHomeUtil = createSharedComposable(useHome)