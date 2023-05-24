import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'
import { IHotel, IParamHotel } from '@/libs/types/hotelType'
import { ICity } from '@/libs/types/commonType'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { hotels } = storeToRefs(hotelStore)
  const popularHotels = ref<IHotel[]>([])
  const recomendCities = ref<ICity[]>([])
  const { deCodeHtml } = convertionType()
  const selectedCity = ref<number>(0)
  const loadingPanelHotel = ref<boolean>(false)

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
      .then((data: any) => {
        popularHotels.value = data.results
        loadingPanelHotel.value = false
      })
  }

  const getHotelsByFilterPanel = (params: any) => {
    hotelStore.getHotelsByFilter(params)
      .then(data => hotels.value = data.results)
  }

  return {
    hotels,
    popularHotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    deCodeHtml,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelsByFilterPanel
  }
}
export const useHotelUtil = createSharedComposable(createHotel)