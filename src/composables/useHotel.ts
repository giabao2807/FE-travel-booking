import { IParamRoomType } from '@/store/hotels'
import { IParamHotel } from '@/store/hotels'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from '@/composables/useLoading'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { recomendCities, hotels, hotel, roomTypes } = storeToRefs(hotelStore)
  const { startLoading, finishLoading } = useLoading()
  const selectedCity = ref<number>(0)
  const getRecomendCities = async() => {
    await hotelStore.getRecomendCities()
    selectedCity.value = recomendCities.value[0]?.id
  }
  const getRecomendHotelByCity = async(id: number) => {
    const param:IParamHotel = {
      cityId: id,
      page: 1,
      pageSize: 8
    }
    await hotelStore.getHotelByCity(param)
  }

  const getHotelById = async(id: string) => {
    await hotelStore.getHotelSumaryById(id)
    await hotelStore.getRoomTypeById({ id: id })
  }
  return {
    hotels,
    recomendCities,
    selectedCity,
    hotel,
    roomTypes,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelById
  }
}
export const useHotelUtil = createSharedComposable(createHotel)