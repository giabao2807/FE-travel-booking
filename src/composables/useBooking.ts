import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'

const createBooking = () => {
  const bookStore = useBookStore()
  const historyBookingTours = ref<any>([])
  const historyBookingHotels = ref<any>([])
  const getHistoryBookingTours = () => {
    bookStore.getHistoryBooking(1)
      .then(data => historyBookingTours.value = data)
  }
  const getHistoryBookingHotels = () => {
    bookStore.getHistoryBooking(2)
      .then(data => historyBookingHotels.value = data)
  }
  return {
    historyBookingTours,
    historyBookingHotels,
    getHistoryBookingTours,
    getHistoryBookingHotels
  }
}
export const useBooking = createSharedComposable(createBooking)