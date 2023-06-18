import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

export const usePartnerHotelsStore = defineStore('partnerHotelsStore', () => {

  const getHotels = async(params?: IParamPage) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'hotel/for_management',
      params: params
    })
  }
  const getRoomById = async(id: string) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `hotel/room/${id}`
    })
  }
  const createHotel = async(data: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'hotel',
      data: data
    })
  }
  const createRoom = async(id: string, data: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: `hotel/${id}/create_rooms`,
      data: data
    })
  }
  const updateHotel = async(id: string, data: any) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `hotel/${id}`,
      data: data
    })
  }
  const updateRoom = async(id: string, data: any) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `hotel/room/${id}`,
      data: data
    })
  }
  const deactivateHotel = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `hotel/${id}/deactivate`
    })
  }
  const activateHotel = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `hotel/${id}/activate`
    })
  }
  return {
    getHotels,
    deactivateHotel,
    activateHotel,
    createHotel,
    updateHotel,
    createRoom,
    updateRoom,
    getRoomById
  }
})
