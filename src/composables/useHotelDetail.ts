import { ref, computed } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'
import { useRoute } from 'vue-router'
import { IDetailHotel, IHotel, IParamReview, IParamRoomType, IReview, IRoomType } from '@/libs/types/hotelType'
import { useBookingDialog } from './useBookingDialog'

const createHotelDetail = () => {
  const hotelStore = useHotelStore()
  const { initFilterHotel } = hotelStore
  const filtersHotel = ref<any>(initFilterHotel)
  const route = useRoute()
  const anotherHotels = ref<IHotel[]>([])
  const hotelInfo = ref<IDetailHotel>()
  const rooms = ref<IRoomType[]>([])
  const { deCodeHtml } = convertionType()
  const firstPageReview = ref<IReview>()
  const dataReview = ref<IReview>()
  const pageReview = ref<number>(1)
  const loadingReview = ref<boolean>(false)
  const dialogReview = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const loadingRooms = ref<boolean>(false)
  const hotelId = computed(() => route.params.id as string)
  const dialogBooking = ref<boolean>(false)
  const { roomsBook } = useBookingDialog()

  const countDate = computed(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    if (filtersHotel.value.startDate && filtersHotel.value.endDate) {
      const startDate = new Date(filtersHotel.value.startDate)
      const endDate = new Date(filtersHotel.value.endDate)
      const time = Math.abs(startDate.getTime() - endDate.getTime())
      return Math.round(time / ONE_DAY)
    }
    return null
  })

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
    getRoomByDate({ id: id, startDate: filtersHotel.value.startDate, endDate: filtersHotel.value.endDate })
    getAnotherHotelsByCity(id)
    getFirstPageReviews({ id : id })
  }

  const changeEndDate = () => {
    filtersHotel.value.endDate = ''
  }
  const totalAmountBook = computed(() => {
    let total = 0
    rooms?.value.forEach(item => {
      total += item.amount ? item.amount : 0
    })
    return total
  })
  const totalPrice = computed(() => {
    return rooms?.value.reduce((total, item) => {
      const amount = item.amount || 0
      const coupon = hotelInfo?.value?.couponData.discountPercent || 0
      return total + (amount * (item.price - (item.price * coupon / 100))) }, 0)
  })
  return {
    hotelInfo,
    rooms,
    filtersHotel,
    countDate,
    firstPageReview,
    dataReview,
    dialogReview,
    loadingReview,
    loadingRooms,
    anotherHotels,
    pageReview,
    totalAmountBook,
    roomsBook,
    dialogBooking,
    totalPrice,
    hotelId,
    deCodeHtml,
    getRoomByDate,
    getHotelById,
    getReviews,
    changeEndDate
  }
}
export const useHotelDetailUtil = createSharedComposable(createHotelDetail)