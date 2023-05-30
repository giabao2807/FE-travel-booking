import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'

const createBooking = () => {
  const bookStore = useBookStore()
  const historyBookingTours = ref<any>([])
  const historyBookingHotels = ref<any>([])
  const pageTour = ref<number>()
  const pageHotel = ref<number>()
  const getHistoryBookingTours = (page?: number) => {
    bookStore.getHistoryBooking({ type: 2, page: page })
      .then(data => historyBookingTours.value = data)
  }
  const getHistoryBookingHotels = (page?: number) => {
    bookStore.getHistoryBooking({ type: 1, page: page })
      .then(data => historyBookingHotels.value = data)
  }
  return {
    pageTour,
    pageHotel,
    historyBookingTours,
    historyBookingHotels,
    getHistoryBookingTours,
    getHistoryBookingHotels
  }
}
export const useBooking = createSharedComposable(createBooking)