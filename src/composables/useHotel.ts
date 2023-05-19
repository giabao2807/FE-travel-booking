import { ref } from 'vue'
import { useHotelStore, IParamHotel } from '@/store/hotels'
import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { recomendCities, hotels } = storeToRefs(hotelStore)
  const { deCodeHtml } = convertionType()
  const selectedCity = ref<number>(0)
  const loadingPanelHotel = ref<boolean>(true)

  const getRecomendCities = async() => {
    await hotelStore.getRecomendCities()
    recomendCities.value[0]?.id ? selectedCity.value = recomendCities.value[0].id : ''
  }

  const getRecomendHotelByCity = async(id: Partial<number>) => {
    const param:IParamHotel = {
      cityId: id,
      page: 1,
      pageSize: 8
    }
    await hotelStore.getHotelByCity(param).then(() =>
      loadingPanelHotel.value = false)
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