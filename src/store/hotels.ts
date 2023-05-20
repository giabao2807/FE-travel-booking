import { IParamPage } from '@/libs/types/commonType'
import { IParamHotel, IParamReview, IParamRoomType } from '@/libs/types/hotelType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useHotelStore = defineStore('hotelStore', () => {


  const getRecomendCities = async(amount = 10) =>{
    return await connectionsAPI({
      methods: 'GET',
      path: 'general/city/top-recommend-cities',
      params: { amount: amount },
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getHotelByCity = async(paramHotel: Partial<IParamHotel>) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `general/city/${paramHotel.cityId}/top-hotels`,
      params: { pageSize: paramHotel.pageSize, page: paramHotel.page },
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getHotelSumaryById = async(id: string) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `hotel/${id}`,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  const getRoomTypeById = async(param: Partial<IParamRoomType>) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `hotel/${param.id}/get_available_rooms`,
      headers: { 'Content-Type': 'application/json' },
      params: { startDate: param.startDate, endDate: param.endDate }
    })
  }
  const getReviewsHotel = async(param: Partial<IParamReview>) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `hotel/${param.id}/get_reviews`,
      headers: { 'Content-Type': 'application/json' },
      params: { page: param.page, pageSize: param.pageSize }
    })
  }
  return {
    getRecomendCities,
    getHotelByCity,
    getHotelSumaryById,
    getRoomTypeById,
    getReviewsHotel
  }
})
