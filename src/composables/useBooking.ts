/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useBookStore } from '@/store/booking'
import { useLoading } from '@/composables/useLoading'
import { useFeedBack } from './useFeedBack'

const createBooking = () => {
  const bookStore = useBookStore()
  const { feedBack } = useFeedBack()
  const { startLoading, finishLoading } = useLoading()
  const historyBookingTours = ref<any>([])
  const historyBookingHotels = ref<any>([])
  const pageTour = ref<number>()
  const pageHotel = ref<number>()
  const messageStatusPayment = ref<string>('')
  const tourBookingDetail = ref<any>()
  const hotelBookingDetail = ref<any>()
  const dialogBooking = ref<boolean>(false)
  const dialogBookingTourDetail = ref<boolean>(false)
  const dialogBookingHotelDetail = ref<boolean>(false)
  const loadingTours = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const getHistoryBookingTours = async(page?: number) => {
    loadingTours.value = true
    await bookStore.getHistoryBooking({ type: 2, page: page })
      .then(data => {
        historyBookingTours.value = data
        loadingTours.value = false
      }).catch((error: any) => {
        loadingTours.value = false
        feedBack({
          title: 'Get Booking Tours',
          message: error.data,
          type:'error'
        })
      })
  }
  const getHistoryBookingHotels = async(page?: number) => {
    loadingHotels.value = true
    await bookStore.getHistoryBooking({ type: 1, page: page })
      .then(data => {
        historyBookingHotels.value = data
        loadingHotels.value = false
      }).catch((error: any) => {
        loadingHotels.value = false
        feedBack({
          title: 'Get Booking Hotels',
          message: error.data,
          type:'error'
        })
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
  const getTourBookingDetail = async(id: string) => {
    startLoading()
    await bookStore.getBookingDetail(id)
      .then(data => {
        tourBookingDetail.value = data
        dialogBookingTourDetail.value = true
      }).catch(error => {
        feedBack({
          title: 'Get Booking Tour Detail',
          message: error.data,
          type:'error'
        })
      })
    finishLoading()
  }
  const getHotelBookingDetail = async(id: string) => {
    startLoading()
    await bookStore.getBookingDetail(id)
      .then(data => {
        hotelBookingDetail.value = data
        dialogBookingHotelDetail.value = true
      }).catch(error => {
        feedBack({
          title: 'Get Booking Tour Detail',
          message: error.data,
          type:'error'
        })
      })
    finishLoading()
  }
  return {
    pageTour,
    pageHotel,
    dialogBooking,
    dialogBookingTourDetail,
    dialogBookingHotelDetail,
    tourBookingDetail,
    hotelBookingDetail,
    loadingTours,
    loadingHotels,
    messageStatusPayment,
    historyBookingTours,
    historyBookingHotels,
    getHistoryBookingTours,
    getHistoryBookingHotels,
    callBackPayment,
    getTourBookingDetail,
    getHotelBookingDetail
  }
}
export const useBooking = createSharedComposable(createBooking)