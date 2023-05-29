import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useBookStore = defineStore('bookStore', () => {
  const bookingService = async(data?: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'booking',
      data: data
    })
  }

  const callBackPayment = async(params?: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'booking/payment_callback',
      params: params
    })
  }
  return {
    bookingService,
    callBackPayment
  }
})
