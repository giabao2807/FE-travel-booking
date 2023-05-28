
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'
import { useLoading } from '@/composables/useLoading'
import { IError } from '@/libs/types/commonType'
import { useHotelStore } from '@/store/hotels'
import { storeToRefs } from 'pinia'
import { IBookingHotel, IBookingTour } from '@/libs/types/bookType'

const createBooking = () => {
  const bookStore = useBookStore()
  const hotelStore = useHotelStore()
  const { initFilterHotel } = storeToRefs(hotelStore)
  const step = ref<number>(1)
  const linkPayment = ref<string>()
  const errorFeedBack = ref<IError>()
  const initBookngTour: IBookingTour = {
    bookingItems: [
      {
        tourId: '',
        quantity: 1
      }
    ],
    note: '',
    startDate: '',
    type: 2,
    bankCode: ''
  }
  const initBookngHotel: IBookingHotel = {
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
  const bookTour = ref<IBookingTour>(initBookngTour)
  const bookHotel = ref<IBookingHotel>(initBookngHotel)
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
    bookTour.value = initBookngTour
  }
  const resetBookHotel = () => {
    step.value = 1
    bookHotel.value = initBookngHotel
  }
  return {
    step,
    linkPayment,
    errorFeedBack,
    initFilterHotel,
    bookTour,
    bookHotel,
    resetBookTour,
    resetBookHotel,
    bookingService
  }
}
export const useBooking = createSharedComposable(createBooking)