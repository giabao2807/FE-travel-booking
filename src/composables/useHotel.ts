import { ref } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'
import { ICity, IHotel, IParamHotel } from '@/libs/types/hotelType'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const hotels = ref<IHotel[]>([])
  const recomendCities = ref<ICity[]>([])
  const { deCodeHtml } = convertionType()
  const selectedCity = ref<number>(0)
  const loadingPanelHotel = ref<boolean>(false)

  const getRecomendCities = async() => {
    await hotelStore.getRecomendCities()
      .then(data => {
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
      .then(data => {
        hotels.value = data.results
        loadingPanelHotel.value = false
      })
  }

  return {
    hotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    deCodeHtml,
    getRecomendHotelByCity,
    getRecomendCities
  }
}
export const useHotelUtil = createSharedComposable(createHotel)