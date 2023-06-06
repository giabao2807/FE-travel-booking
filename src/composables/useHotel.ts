import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'
import { IHotel, IParamHotel, IResponseHotel } from '@/libs/types/hotelType'
import { ICity, IFilterPanel } from '@/libs/types/commonType'
import { useRoute } from 'vue-router'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { hotels } = storeToRefs(hotelStore)
  const route = useRoute()
  const popularHotels = ref<IHotel[]>([])
  const recomendCities = ref<ICity[]>([])
  const { deCodeHtml } = convertionType()
  const selectedCity = ref<number>(0)
  const loadingPanelHotel = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const pageHotel = ref<number>(1)
  const queryData = route.query as IFilterPanel
  const filtersHotels = ref<IFilterPanel>({
    cityId: +(queryData?.cityId || '') || undefined,
    startDate: queryData?.startDate,
    endDate: queryData?.endDate
  })
  const titlePage = computed(() => {
    return {
      cityId: filtersHotels.value.cityId,
      startDate: filtersHotels.value.startDate,
      endDate: filtersHotels.value.endDate
    }
  })
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


  return {
    hotels,
    popularHotels,
    filtersHotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    loadingHotels,
    pageHotel,
    titlePage,
    deCodeHtml,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelsByFilterPanel
  }
}
export const useHotelUtil = createSharedComposable(createHotel)