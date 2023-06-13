import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'
import { useLoading } from '@/composables/useLoading'

const createBooking = () => {
  const bookStore = useBookStore()
  const { startLoading, finishLoading } = useLoading()
  const historyBookingTours = ref<any>([])
  const historyBookingHotels = ref<any>([])
  const pageTour = ref<number>()
  const pageHotel = ref<number>()
  const messageStatusPayment = ref<string>('')
  const dialogBooking = ref<boolean>(false)
  const loadingTours = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const getHistoryBookingTours = async(page?: number) => {
    loadingTours.value = true
    await bookStore.getHistoryBooking({ type: 2, page: page })
      .then(data => {
        historyBookingTours.value = data
        loadingTours.value = false
      }).catch(error => {
        loadingTours.value = false
      })
  }
  const getHistoryBookingHotels = async(page?: number) => {
    loadingHotels.value = true
    await bookStore.getHistoryBooking({ type: 1, page: page })
      .then(data => {
        historyBookingHotels.value = data
        loadingHotels.value = false
      }).catch(error => {
        loadingHotels.value = false
      })
  }
  const callBackPayment = async(params: any) => {
    startLoading()
    await bookStore.callBackPayment(params)
      .then(data => {
        messageStatusPayment.value = data.message
        dialogBooking.value = true
      }).catch(error => {
        messageStatusPayment.value = error.data.message
        dialogBooking.value = true
      })
    finishLoading()
  }
  return {
    pageTour,
    pageHotel,
    dialogBooking,
    loadingTours,
    loadingHotels,
    messageStatusPayment,
    historyBookingTours,
    historyBookingHotels,
    getHistoryBookingTours,
    getHistoryBookingHotels,
    callBackPayment
  }
}
export const useBooking = createSharedComposable(createBooking)