import { ref, computed, watchEffect } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { IFilterDate } from '@/libs/types/commonType'
import { convertionType } from '@/helpers/convertion'
import { useRoute } from 'vue-router'
import { IDetailHotel, IHotel, IParamReview, IParamRoomType, IReview, IRoomType } from '@/libs/types/hotelType'

const createHotelDetail = () => {
  const hotelStore = useHotelStore()
  const route = useRoute()
  const anotherHotels = ref<IHotel[]>([])
  const hotelInfo = ref<IDetailHotel>()
  const rooms = ref<IRoomType[]>([])
  const { deCodeHtml } = convertionType()
  const filterDetail = ref<IFilterDate>({
    startDate: '',
    endDate: ''
  })
  const firstPageReview = ref<IReview>()
  const dataReview = ref<IReview>()
  const pageReview = ref<number>(1)
  const loadingReview = ref<boolean>(false)
  const dialogReview = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const loadingRooms = ref<boolean>(false)
  const hotelId = computed(() => route.params.id as string)

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
  const getRooms = (idHotel: string) => {
    loadingRooms.value = true
    hotelStore.getRoomTypeById({ id: idHotel })
      .then(data => {
        rooms.value = data
        loadingRooms.value = false
      })
  }

  const getRoomByDate = (params: IParamRoomType) => {
    loadingRooms.value = true
    hotelStore.getRoomTypeById(params)
      .then(data => {
        rooms.value = data
        loadingRooms.value = false
      })
  }

  const getFirstPageReviews = (params: IParamReview) => {
    hotelStore.getReviewsHotel(params)
      .then(data => firstPageReview.value = data)
  }

  const getReviews = (params: IParamReview) => {
    loadingReview.value = true
    hotelStore.getReviewsHotel(params)
      .then(data => {
        dataReview.value = data
        loadingReview.value = false
      })
  }

  const getAnotherHotelsByCity = async(id: string) => {
    loadingHotels.value = true
    await hotelStore.getHotelByCity({ cityId: hotelInfo.value?.city })
      .then(data => {
        anotherHotels.value = data.results.filter((item: IHotel) => item.id !== id)
      })
    loadingHotels.value = false
  }

  const getHotelById = async(id: string) => {
    await hotelStore.getHotelSumaryById(id)
      .then(data => hotelInfo.value = data)
    getRooms(id)
    getAnotherHotelsByCity(id)
  }

  const changeEndDate = () => {
    filterDetail.value.endDate = ''
  }
  watchEffect(async() => {
    hotelId.value
    if (hotelId.value) {
      pageReview.value = 1
      await getHotelById(hotelId.value)
      getFirstPageReviews({ id: hotelId.value })
    }
  })
  return {
    hotelInfo,
    rooms,
    filterDetail,
    countDate,
    firstPageReview,
    dataReview,
    dialogReview,
    loadingReview,
    loadingRooms,
    anotherHotels,
    pageReview,
    deCodeHtml,
    getRoomByDate,
    getHotelById,
    getReviews,
    changeEndDate
  }
}
export const useHotelDetailUtil = createSharedComposable(createHotelDetail)