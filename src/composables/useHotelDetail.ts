import { ref, onMounted, computed } from 'vue'
import { useHotelStore, IParamReview, IParamRoomType } from '@/store/hotels'
import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { IFilterDate } from '@/libs/types/commonType'
import { convertionType } from '@/helpers/convertion'
import { useRoute } from 'vue-router'

const createHotelDetail = () => {
  const hotelStore = useHotelStore()
  const { hotel, rooms } = storeToRefs(hotelStore)
  const { deCodeHtml } = convertionType()
  const route = useRoute()
  const hotelId = route.params.id as string
  const filterDetail = ref<IFilterDate>({
    startDate: '',
    endDate: ''
  })
  const firstPageReview = ref<any>()
  const dataReview = ref<any>()
  const loadingReview = ref<boolean>(true)
  const dialogReview = ref<boolean>(false)

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

  const initParamReview = ref<IParamReview>({
    id: hotelId,
    page: 1,
    pageSize: 12
  })
  const getFirstPageReviews = async() => {
    await hotelStore.getReviewsHotel(initParamReview.value)
      .then(data => firstPageReview.value = data)
  }

  const getReviews = async(params: IParamReview = initParamReview.value) => {
    loadingReview.value = true
    await hotelStore.getReviewsHotel(params)
      .then(data => {
        dataReview.value = data
        loadingReview.value = false
      })
  }

  onMounted(() => {
    getHotelById(hotelId)
    getFirstPageReviews()
  })
  return {
    hotel,
    rooms,
    filterDetail,
    countDate,
    firstPageReview,
    dataReview,
    initParamReview,
    dialogReview,
    loadingReview,
    minDate,
    deCodeHtml,
    getRoomByDate,
    getHotelById,
    getReviews
  }
}
export const useHotelDetailUtil = createSharedComposable(createHotelDetail)