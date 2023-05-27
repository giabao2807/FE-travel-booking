import { hanldeRoute } from '@/helpers/loadingRoute'
import { ref, computed, onMounted } from 'vue'
import { ICity, IFilterPanel } from '@/libs/types/commonType'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'
import { PANEL_IMAGE } from '@/resources/mockData'

export type IImageCol = ICity & {
  col?: number
}

const useHome = () => {
  const filterPanel = ref<IFilterPanel>({
    cityId: undefined,
    startDate: '',
    endDate: ''
  })
  const flagSearch = ref<string>('Tours')
  const {
    popularHotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelsByFilterPanel
  } = useHotelUtil()

  const {
    popularTours,
    getPopularTours,
    getToursByFilterPanel
  } = useTourUtil()

  const getCitiesPanel = computed(() => {
    const citiesCols: IImageCol[] = []
    recomendCities.value?.slice(0, 5).forEach((item, index) => citiesCols.push({ ...PANEL_IMAGE[index], ...item }))
    return citiesCols
  })

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
  const handleFilter = () => {
    if (flagSearch.value === 'Tours') {
      getToursByFilterPanel(filterPanel.value)
      hanldeRoute({ name: 'tours' })
    }
    else {
      getHotelsByFilterPanel(filterPanel.value)
      hanldeRoute({ name: 'hotels' })
    }
  }
  onMounted(async() => {
    await getRecomendCities()
    await getPopularTours()
    getRecomendHotelByCity(selectedCity.value)
  })

  return {
    recomendCities,
    popularHotels,
    selectedCity,
    popularTours,
    getCitiesPanel,
    loadingPanelHotel,
    filterPanel,
    flagSearch,
    countDate,
    getRecomendHotelByCity,
    changeEndDate,
    handleFilter
  }
}
export const useHomeUtil = createSharedComposable(useHome)