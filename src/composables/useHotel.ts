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
    startLoading()
    const param:IParamHotel = {
      cityId: id,
      page: 1,
      pageSize: 8
    }
    await hotelStore.getHotelByCity(param)
    finishLoading()
  }

  const getHotelById = async(id: string) => {
    startLoading()
    const param:IParamRoomType = { id: id }
    await hotelStore.getHotelSumaryById(id)
    await hotelStore.getRoomTypeById(param)
    finishLoading()
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