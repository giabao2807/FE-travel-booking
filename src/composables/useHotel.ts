import { ref, onMounted } from 'vue'
import { IParamHotel, IParamRoomType } from '@/store/hotels'
import { storeToRefs } from 'pinia'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from '@/composables/useLoading'
import { IFilterDate } from '@/libs/types/commonType'
import { convertionType } from '@/helpers/convertion'
import { useRoute } from 'vue-router'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { recomendCities, hotels, hotel, rooms } = storeToRefs(hotelStore)
  const { startLoading, finishLoading } = useLoading()
  const filterDetail = ref<IFilterDate>({
    startDate: new Date,
    endDate: new Date
  })
  const selectedCity = ref<number>(0)
  const route = useRoute()
  const hotelId = route.params.id as string
  const { deCodeHtml } = convertionType()
  const minDate = (date: Date) => date.toISOString().split('T')[0]
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

  const getRoomByDate = async() => {
    const params: IParamRoomType = ({
      id: hotelId,
      startDate: filterDetail.value.startDate,
      endDate: filterDetail.value.endDate
    })
    await hotelStore.getRoomTypeById(params)
  }
  onMounted(() => {
    console.log(filterDetail.value)
    getHotelById(hotelId)
  })
  return {
    hotels,
    recomendCities,
    selectedCity,
    hotel,
    rooms,
    filterDetail,
    minDate,
    deCodeHtml,
    getRoomByDate,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelById
  }
}
export const useHotelUtil = createSharedComposable(createHotel)