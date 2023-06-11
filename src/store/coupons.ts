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
  return {
    getCoupons,
    createPartnerCoupons
  }
})
