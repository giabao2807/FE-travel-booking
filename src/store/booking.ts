/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHistoryBooking } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useBookStore = defineStore('bookStore', () => {
  const bookingService = async(data?: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'booking',
      params: { env: 2 },
      data: data
    })
  }
  const getHistoryBooking = async(params: IHistoryBooking) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'booking',
      params: params
    })
  }
  const callBackPayment = async(params?: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'booking/payment_callback',
      params: params,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  const getPaymentLinkAgain = async(params: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `booking/${params.id}/get_payment_link`,
      params: { bankCode: params.bankCode, env: 2 }
    })
  }
  const postReview = async(data: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'booking/review',
      data: data
    })
  }
  const getBookingDetail = async(id: string) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `booking/${id}`
    })
  }
  return {
    bookingService,
    callBackPayment,
    getHistoryBooking,
    getPaymentLinkAgain,
    postReview,
    getBookingDetail
  }
})
