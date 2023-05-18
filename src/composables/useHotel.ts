import { ref, onMounted, computed } from 'vue'
import { useHotelStore, IParamReview, IParamHotel, IParamRoomType } from '@/store/hotels'
import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { IFilterDate } from '@/libs/types/commonType'
import { convertionType } from '@/helpers/convertion'
import { useRoute } from 'vue-router'
import { usePanelLoading } from './usePanelLoading'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { startLoading, finishLoading } = usePanelLoading()
  const { recomendCities, hotels, hotel, rooms } = storeToRefs(hotelStore)
  const { deCodeHtml } = convertionType()
  const selectedCity = ref<number>(0)
  const loading = ref<boolean>(true)
  const route = useRoute()
  const hotelId = route.params.id as string
  const filterDetail = ref<IFilterDate>({
    startDate: '',
    endDate: ''
  })
  const dataReview = ref<any>()

  const minDate = (date: Date) => date.toISOString().slice(0, 10)
  const countDate = computed(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    if (filterDetail.value.startDate && filterDetail.value.endDate) {
      const startDate = new Date(filterDetail.value.startDate)
      const endDate = new Date(filterDetail.value.endDate)
      const time = Math.abs(startDate.getTime() - endDate.getTime())
      return Math.round(time / ONE_DAY)
    }
    return null
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

  const getReviews = async() => {
    startLoading()
    const params: IParamReview = ({
      id: hotelId,
      page: 1,
      pageSize: 12
    })
    await hotelStore.getReviewsHotel(params)
      .then(data => dataReview.value = data)
    console.log(dataReview.value)
    finishLoading()
  }

  onMounted(() => {
    if (hotelId) {
      getHotelById(hotelId)
      getReviews()
    }
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
    dataReview,
    minDate,
    deCodeHtml,
    getRoomByDate,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelById
  }
}
export const useHotelUtil = createSharedComposable(createHotel)