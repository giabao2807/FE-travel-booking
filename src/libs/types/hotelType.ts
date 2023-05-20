import { IParamPage } from './commonType'

export type ICity = {
  id: number,
  name: string,
  image?: string
}
export type IHotel = {
  id: string,
  name: string,
  address: string,
  numReview: number,
  priceRange: string,
  coverPicture: string,
  rateAverage: number,
  longitude: number,
  latitude: number,
  couponData: any,
}
export type IParamHotel = IParamPage & {
  cityId: number
}
export type IParamReview = IParamPage & {
  id: string
}
export type IParamRoomType = {
  id: string,
  startDate?: string,
  endDate?: string
}
export type IDetailHotel = IHotel & {
createdAt: string,
updatedAt: string,
descriptions: string,
rules: string,
owner: string,
city: number,
listImages: string[]
}
export type IRoomType = {
  id: string,
  name: string,
  beds: string,
  adults: number,
  children: number,
  description: string,
  listImages: string[],
  price: number,
  square: string,
  quantity: number,
  totalRoomAmount: number,
  availableRoomAmount: number
}

export type IOwner = {
  id: string,
  avatar: string,
  name: string
}

export type IResultReview = {
  id: string,
  createdAt: string,
  updatedAt: string,
  isActive: boolean,
  title: string,
  content: string,
  rate: number,
  hotel: string,
  owner: IOwner[]
}

export type IReview = {
 current: number,
 pageSize: number,
 pageNumber: number,
 count: number,
  results: IResultReview[]
}