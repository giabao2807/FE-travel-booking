import { IFilterPanel } from '@/libs/types/commonType'
import { IParamHotel, IParamReview, IParamRoomType, IResponseHotel } from '@/libs/types/hotelType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useHotelStore = defineStore('hotelStore', () => {
  const hotels = ref<IResponseHotel>()
  const initFilterHotel: IFilterPanel = ({
    pageSize: 12,
    page: 1,
    cityId: undefined,
    startDate: '',
    endDate: ''
  })
  const getHotelsForUser = async(limit: number) =>{
    return await connectionsAPI({
      methods: 'GET',
      path: 'hotel/recommend_for_user',
      params: { limit: limit }
    })
  }
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

  const getHotelsByFilter = async(params = initFilterHotel) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'hotel',
      headers: { 'Content-Type': 'application/json' },
      params: params
    })
  }
  const addFavoriteHotel = async(id: string) => {
    return await connectionsAPI({
      methods: 'POST',
      path: `hotel/${id}/add_favorite`
    })
  }
  const removeFavoriteHotel = async(id: string) => {
    return await connectionsAPI({
      methods: 'DELETE',
      path: `hotel/${id}/remove_favorite`
    })
  }
  return {
    hotels,
    initFilterHotel,
    getHotelsByFilter,
    getRecomendCities,
    getHotelByCity,
    getHotelSumaryById,
    getRoomTypeById,
    getReviewsHotel,
    getHotelsForUser,
    addFavoriteHotel,
    removeFavoriteHotel
  }
})
