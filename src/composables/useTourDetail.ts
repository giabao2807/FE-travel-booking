import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useCities } from './useCities'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { IDetailTour, ITour } from '@/libs/types/tourType'
import { useRoute } from 'vue-router'
import { useBookingDialog } from '@/composables/useBookingDialog'
import { IParamReview, IReview } from '@/libs/types/hotelType'
import { useLoading } from './useLoading'

const createTourDetail = () => {
  const tourStore = useTourStore()
  const { initFilterTour } = storeToRefs(tourStore)
  const route = useRoute()
  const tourId = computed(() => route.params.id as string)
  const { getCityByName } = useCities()
  const { startLoading, finishLoading } = useLoading()
  const anotherTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()
  const dialogBooking = ref<boolean>(false)
  const loadingAnotherTours = ref<boolean>(false)
  const firstPageReview = ref<IReview>()
  const dataReview = ref<IReview>()
  const loadingReview = ref<boolean>(false)
  const bookingRef = ref()
  const { bookTour, quantityTour } = useBookingDialog()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getQuantityByStartDate = (event: any) => {
    const response = event ? tourStore.getQuantityByDate({ id: tourId.value, startDate: event }) : null
    response?.then(data => quantityTour.value = data?.availableGroupSize)
  }

  const getAnotherToursByCity = async(id: string, city?: string) => {
    loadingAnotherTours.value = true
    await tourStore.getToursByFilter({ cityId:  getCityByName(city || '')?.id })
      .then(data => {
        anotherTours.value = data.results.filter((item: ITour) => item.id !== id)
      })
    loadingAnotherTours.value = false
  }

  const getFirstPageReviews = (params: IParamReview) => {
    tourStore.getReviewsTour(params)
      .then(data => firstPageReview.value = data)
  }

  const getReviews = (params: IParamReview) => {
    loadingReview.value = true
    tourStore.getReviewsTour(params)
      .then(data => {
        dataReview.value = data
        loadingReview.value = false
      })
  }
  const getTourById = async(id: string) => {
    startLoading()
    await tourStore.getTourById(id)
      .then(data => {
        tourInfo.value = data
      })
    finishLoading()
    getAnotherToursByCity(tourId.value, tourInfo.value?.city)
    getFirstPageReviews({ id: id })
  }
  const openDialogBooking = async() => {
    const { valid } = await bookingRef.value.validate()
    valid ? (dialogBooking.value = true) : null
  }
  return {
    tourInfo,
    bookTour,
    bookingRef,
    anotherTours,
    dialogBooking,
    tourId,
    loadingAnotherTours,
    loadingReview,
    firstPageReview,
    dataReview,
    quantityTour,
    initFilterTour,
    openDialogBooking,
    getReviews,
    getQuantityByStartDate,
    getTourById,
    getAnotherToursByCity
  }
}
export const useTourDetail = createSharedComposable(createTourDetail)