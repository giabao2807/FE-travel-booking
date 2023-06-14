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
  const createTour = async(data: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'tour',
      data: data
    })
  }
  const updateTour = async(id: string, data: any) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `tour/${id}`,
      data: data
    })
  }
  const deactivateTour = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `tour/${id}/deactivate`
    })
  }
  const activateTour = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `tour/${id}/activate`
    })
  }
  return {
    deactivateTour,
    activateTour,
    getTours,
    createTour,
    updateTour
  }
})
