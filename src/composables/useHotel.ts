import { ref, onMounted, computed } from 'vue'
import { IParamHotel, IParamRoomType } from '@/store/hotels'
import { storeToRefs } from 'pinia'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { IFilterDate } from '@/libs/types/commonType'
import { convertionType } from '@/helpers/convertion'
import { useRoute } from 'vue-router'
import { usePanelLoading } from './usePanelLoading'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { startLoading, finishLoading } = usePanelLoading()
  const { recomendCities, hotels, hotel, rooms } = storeToRefs(hotelStore)
  const filterDetail = ref<IFilterDate>({
    startDate: '',
    endDate: ''
  })
  const selectedCity = ref<number>(0)
  const loading = ref<boolean>(true)
  const route = useRoute()
  const hotelId = route.params.id as string
  const { deCodeHtml } = convertionType()
  const minDate = (date: Date) => date.toISOString().slice(0, 10)
  const countDate = computed(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    if (filterDetail.value.startDate && filterDetail.value.endDate) {
      const startDate = new Date(filterDetail.value.startDate)
      const endDate = new Date(filterDetail.value.endDate)
      const time = Math.abs(startDate.getTime() - endDate.getTime())
      return Math.round(time / ONE_DAY)
    }
    return 0
  })
  const getRecomendCities = async() => {
    await hotelStore.getRecomendCities()
    recomendCities.value[0]?.id ? selectedCity.value = recomendCities.value[0].id : ''
  }
  const getRecomendHotelByCity = async(id: Partial<number>) => {
    loading.value = true
    const param:IParamHotel = {
      cityId: id,
      page: 1,
      pageSize: 8
    }
    await hotelStore.getHotelByCity(param).then(() => loading.value = false)
  }

  const getHotelById = async(id: string) => {
    await hotelStore.getHotelSumaryById(id)
    startLoading()
    await hotelStore.getRoomTypeById({ id: id })
    finishLoading()
  }

  const getRoomByDate = async() => {
    startLoading()
    const params: IParamRoomType = ({
      id: hotelId,
      startDate: filterDetail.value.startDate,
      endDate: filterDetail.value.endDate
    })
    await hotelStore.getRoomTypeById(params)
    finishLoading()
  }
  onMounted(() => {
    getHotelById(hotelId)
  })
  return {
    hotels,
    recomendCities,
    selectedCity,
    hotel,
    rooms,
    filterDetail,
    loading,
    countDate,
    minDate,
    deCodeHtml,
    getRoomByDate,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelById
  }
}
export const useHotelUtil = createSharedComposable(createHotel)