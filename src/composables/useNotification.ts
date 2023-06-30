/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'
import { useFeedBack } from './useFeedBack'

const createNotification = () => {
  const bookStore = useBookStore()
  const { feedBack } = useFeedBack()
  const historyBookingTours = ref<any>([])
  const historyBookingHotels = ref<any>([])
  const now = new Date()
  const ONE_DAY = 1000 * 60 * 60 * 24
  const getHistoryBookingTours = async(page?: number) => {
    await bookStore.getHistoryBooking({ type: 2, page: page })
      .then(data => {
        const datafilter : any[] = []
        data?.results.map((item: any) => {
          const targetTime = new Date(Date.parse(item?.createdAt))
          const time = Math.abs(targetTime.getTime() - now.getTime())
          const countDate = Math.round(time / ONE_DAY)
          if (countDate <= 1) {
            datafilter.push(item)
          }
        })
        historyBookingTours.value = datafilter?.slice(0, 5)
      })
  }
  const getHistoryBookingHotels = async(page?: number) => {
    await bookStore.getHistoryBooking({ type: 1, page: page })
      .then(data => {
        const datafilter : any[] = []
        data?.results.map((item: any) => {
          const targetTime = new Date(Date.parse(item?.createdAt))
          const time = Math.abs(targetTime.getTime() - now.getTime())
          const countDate = Math.round(time / ONE_DAY)
          if (countDate <= 1) {
            datafilter.push(item)
          }
        })
        historyBookingHotels.value = datafilter?.slice(0, 5)
      })
  }
  return {
    historyBookingTours,
    historyBookingHotels,
    getHistoryBookingTours,
    getHistoryBookingHotels
  }
}
export const useNotification = createSharedComposable(createNotification)