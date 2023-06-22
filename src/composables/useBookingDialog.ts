/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'
import { useTourStore } from '@/store/tours'
import { useLoading } from '@/composables/useLoading'
import { IError } from '@/libs/types/commonType'
import { IBookingHotel, IBookingTour } from '@/libs/types/bookType'
import { IRoomType } from '@/libs/types/hotelType'

const createBooking = () => {
  const bookStore = useBookStore()
  const tourStore = useTourStore()
  const step = ref<number>(1)
  const errorFeedBack = ref<IError>()
  const roomsBook = ref<IRoomType[]>([])
  const formRef = ref()
  const quantityTour = ref<number>(0)
  const initBookingTour: IBookingTour = {
    bookingItems: [
      {
        tourId: '',
        quantity: 0
      }
    ],
    note: '',
    startDate: '',
    type: 2,
    bankCode: ''
  }
  const initBookingHotel: IBookingHotel = {
    bookingItems: [
      {
        roomId: '',
        quantity: 1
      }
    ],
    note: '',
    startDate: '',
    endDate: '',
    type: 1,
    bankCode: ''
  }
  const bookTour = ref<IBookingTour>(initBookingTour)
  const bookHotel = ref<IBookingHotel>(initBookingHotel)
  const { startLoading, finishLoading } = useLoading()
  const bookingService = async(paramsBook: any) => {
    startLoading()
    await bookStore.bookingService(paramsBook).then((data) => {
      window.location.href = data.paymentLink
      finishLoading()
    }).catch(error => {
      errorFeedBack.value = error.data
      finishLoading()
      step.value++
    })
  }
  const resetBookTour = () => {
    step.value = 1
    bookTour.value = initBookingTour
  }
  const resetBookHotel = () => {
    step.value = 1
    bookHotel.value = initBookingHotel
  }
  const getQuantityTour = (params: any) => {
    tourStore.getQuantityByDate(params)
      .then(data => quantityTour.value = data.availableGroupSize)
  }
  return {
    formRef,
    step,
    errorFeedBack,
    bookTour,
    bookHotel,
    roomsBook,
    quantityTour,
    resetBookTour,
    resetBookHotel,
    bookingService,
    getQuantityTour
  }
}
export const useBookingDialog = createSharedComposable(createBooking)