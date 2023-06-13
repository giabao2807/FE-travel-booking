import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'



export const useCouponsStore = defineStore('couponsStore', () => {
  const getCoupons = async(params?: IParamPage) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'general/coupon',
      params: params
    })
  }
  const createPartnerCoupons = async(data: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'general/coupon',
      data: data
    })
  }
  const deleteCoupon = async(id: string) => {
    return await connectionsAPI({
      methods: 'DELETE',
      path: `general/coupon/${id}`
    })
  }
  const getToursForCoupon = async() => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour/tours_for_coupon'
    })
  }
  const getHotelsForCoupon = async() => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'hotel/hotels_for_coupon'
    })
  }
  return {
    getCoupons,
    createPartnerCoupons,
    deleteCoupon,
    getToursForCoupon,
    getHotelsForCoupon
  }
})
