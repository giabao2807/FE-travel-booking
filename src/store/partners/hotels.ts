import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

export const usePartnerHotelsStore = defineStore('partnerHotelsStore', () => {

  const getHotels = async(params?: IParamPage) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'hotel/belongs_to_partner',
      params: params
    })
  }

  return {
    getHotels
  }
})
