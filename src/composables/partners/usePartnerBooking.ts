/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerStore } from '@/store/partners'


const createPartnerBooking = () => {
  const partnerStore = usePartnerStore()
  const bookingTours = ref<any[]>([])
  const bookingHotels = ref<any[]>([])
  const loadingTours = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const selectFilterTour = ref<string>('Name')
  const selectFilterHotel = ref<string>('Name')
  const filterBookingTour = ref<any>({
    name: '',
    status: ''
  })
  const filterBookingHotel = ref<any>({
    name: '',
    status: ''
  })
  const getBookingTours = (params?: any) => {
    loadingTours.value = true
    partnerStore.getBooking(2, params)
      .then(data => {
        bookingTours.value = data
        loadingTours.value = false
      })
  }
  const getBookingHotels = (params?: any) => {
    loadingHotels.value = true
    partnerStore.getBooking(1, params)
      .then(data => {
        bookingHotels.value = data
        loadingHotels.value = false
      })
  }
  return {
    bookingTours,
    loadingTours,
    bookingHotels,
    loadingHotels,
    selectFilterTour,
    selectFilterHotel,
    filterBookingTour,
    filterBookingHotel,
    getBookingTours,
    getBookingHotels
  }
}
export const usePartnerBooking = createSharedComposable(createPartnerBooking)