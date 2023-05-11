import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ICity = {
  id: number,
  name?: string
}
export type IHotel = {
  id: string,
  name: string,
  address: string,
  numReview: number,
  priceRange: string,
  coverPicture: string,
  rateAverage: number,
}
export type IParamHotel = IParamPage & {
  cityId: number
}
export type IParamRoomType = {
  id: string,
  startDate?: Date,
  endDate?: Date
}
export type IDetailHotel = IHotel & {
createdAt: string,
updatedAt: string,
descriptions: string,
rules: string,
owner: string,
listImages: string[]
}
export type IRoomType = {
  id: string,
  name: string,
  beds: string,
  adults: number,
  children: number,
  description: string,
  price: number,
  square: string,
  totalRoomAmount: number,
  availableRoomAmount: number
}

export const useHotelStore = defineStore('hotelStore', () => {
  const recomendCities = ref<ICity[]>([])
  const hotels = ref<IHotel[]>([])
  const hotel = ref<IDetailHotel>()
  const roomTypes = ref<IRoomType[]>([])
  const getRecomendCities = async(amount = 10) =>{
    await connectionsAPI({
      methods: 'GET',
      path: 'general/city/top-recommend-cities',
      params: { amount: amount },
      headers: { 'Content-Type': 'application/json' }
    }).then(data => recomendCities.value = data)
  }

  const getHotelByCity = async(paramHotel: Partial<IParamHotel>) => {
    await connectionsAPI({
      methods: 'GET',
      path: `general/city/${paramHotel.cityId}/top-hotels`,
      params: { pageSize: paramHotel.pageSize, page: paramHotel.page },
      headers: { 'Content-Type': 'application/json' }
    }).then(data => hotels.value = data.results)
  }

  const getHotelSumaryById = async(id: string) => {
    await connectionsAPI({
      methods: 'GET',
      path: `hotel/${id}`,
      headers: { 'Content-Type': 'application/json' }
    }).then((data) => (hotel.value = data))
  }
  const getRoomTypeById = async(param: Partial<IParamRoomType>) => {
    await connectionsAPI({
      methods: 'GET',
      path: `hotel/${param.id}/get_available_rooms`,
      headers: { 'Content-Type': 'application/json' },
      params: { startDate: param.startDate, endDate: param.endDate }
    }).then((data) => (roomTypes.value = data))
  }
  return {
    recomendCities,
    hotels,
    hotel,
    roomTypes,
    getRecomendCities,
    getHotelByCity,
    getHotelSumaryById,
    getRoomTypeById
  }
})
