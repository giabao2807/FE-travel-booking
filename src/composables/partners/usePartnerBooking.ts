import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerStore } from '@/store/partners'


const createPartnerBooking = () => {
  const partnerStore = usePartnerStore()
  const bookingTours = ref<any[]>([])
  const bookingHotels = ref<any[]>([])
  const loadingTours = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const getBookingTours = (params?: IParamPage) => {
    loadingTours.value = true
    partnerStore.getBooking(2, params)
      .then(data => {
        bookingTours.value = data
        loadingTours.value = false
      })
  }
  const getBookingHotels = (params?: IParamPage) => {
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
    getBookingTours,
    getBookingHotels
  }
}
export const usePartnerBooking = createSharedComposable(createPartnerBooking)