import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'
import { IHotel, IParamHotel, IResponseHotel } from '@/libs/types/hotelType'
import { ICity, IFilterPanel } from '@/libs/types/commonType'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { hotels, initFilterHotel } = storeToRefs(hotelStore)
  const popularHotels = ref<IHotel[]>([])
  const recomendCities = ref<ICity[]>([])
  const { deCodeHtml } = convertionType()
  const selectedCity = ref<number>(0)
  const loadingPanelHotel = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const pageHotel = ref<number>(1)
  const titlePage = {
    cityId: initFilterHotel.value.cityId,
    startDate: initFilterHotel.value.startDate,
    endDate: initFilterHotel.value.endDate
  }

  const getRecomendCities = async() => {
    await hotelStore.getRecomendCities()
      .then((data: ICity[]) => {
        recomendCities.value = data
      })
    recomendCities.value[0]?.id ? selectedCity.value = recomendCities.value[0].id : ''
  }

  const getRecomendHotelByCity = (id: Partial<number>) => {
    const param:IParamHotel = {
      cityId: id,
      page: 1,
      pageSize: 8
    }
    loadingPanelHotel.value = true
    hotelStore.getHotelByCity(param)
      .then((data: IResponseHotel) => {
        popularHotels.value = data.results
        loadingPanelHotel.value = false
      })
  }

  const getHotelsByFilterPanel = (params?: IFilterPanel) => {
    loadingHotels.value = true
    hotelStore.getHotelsByFilter(params)
      .then(data => {
        hotels.value = data
        loadingHotels.value = false
      })
  }

  const countDate = computed(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    if (initFilterHotel.value.startDate && initFilterHotel.value.endDate) {
      const startDate = new Date(initFilterHotel.value.startDate)
      const endDate = new Date(initFilterHotel.value.endDate)
      const time = Math.abs(startDate.getTime() - endDate.getTime())
      return Math.round(time / ONE_DAY)
    }
    return null
  })

  return {
    hotels,
    popularHotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    loadingHotels,
    pageHotel,
    countDate,
    initFilterHotel,
    titlePage,
    deCodeHtml,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelsByFilterPanel
  }
}
export const useHotelUtil = createSharedComposable(createHotel)