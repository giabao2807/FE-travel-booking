import { handleRoute } from '@/helpers/loadingRoute'
import { ref, computed, onMounted } from 'vue'
import { ICity, IFilterPanel } from '@/libs/types/commonType'
import { createSharedComposable } from '@vueuse/core'
import { useHotelUtil } from './useHotel'
import { useTourUtil } from './useTour'
import { PANEL_IMAGE } from '@/resources/mockData'
import { useAuthentication } from './useAuth'

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
  const chooseCard = ref<number>(0)
  const chooseCardHotel = ref<number>(0)
  const { authUser } = useAuthentication()
  const {
    popularHotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    hotelsForUser,
    getHotelsForUser,
    getRecomendHotelByCity,
    getRecomendCities
  } = useHotelUtil()

  const {
    popularTours,
    toursForUser,
    getPopularTours,
    getToursForUser
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
      handleRoute({ name: 'tours', query: filterPanel.value })
    }
    else {
      handleRoute({ name: 'hotels', query: filterPanel.value })
    }
  }
  onMounted(async() => {
    await getRecomendCities()
    getPopularTours()
    if (authUser.value.accessToken) {
      getToursForUser()
      getHotelsForUser()
    }
    getRecomendHotelByCity(selectedCity.value)
  })

  return {
    recomendCities,
    popularHotels,
    hotelsForUser,
    selectedCity,
    popularTours,
    getCitiesPanel,
    loadingPanelHotel,
    filterPanel,
    flagSearch,
    countDate,
    toursForUser,
    chooseCard,
    chooseCardHotel,
    getRecomendHotelByCity,
    changeEndDate,
    handleFilter
  }
}
export const useHomeUtil = createSharedComposable(useHome)