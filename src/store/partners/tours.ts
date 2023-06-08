import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

export const usePartnerToursStore = defineStore('partnerToursStore', () => {

  const getTours = async(params?: IParamPage) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour/list_tour',
      params: params
    })
  }

  const deactivateTour = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `tour/${id}/deactivate`
    })
  }
  return {
    deactivateTour,
    getTours
  }
})
