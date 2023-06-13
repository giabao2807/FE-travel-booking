import { Vue } from 'vue-class-component'
import { Method, ResponseType } from 'axios'
export type IForm = Vue & {validate: () => boolean, reset: () => void, resetValidation: () => void}
export type IParamsAPI = {
  methods: Method,
  path?: string,
  params?: any,
  headers?: any,
  data?: any,
  responseType?: ResponseType,
  jwtToken?: string
}

export type IFeedBack = {
  title?: string,
  message?: string,
  type?: '' | 'success' | 'warning' | 'error' | 'info',
}

export type IError = IFeedBack & {
  status?: string | number,
  data?: any
}

export type IParamPage = {
  pageSize?: number,
  page?: number
}
export type IFilterDate = {
  startDate?: string,
  endDate?: string
}
export type ICity = {
  id: number,
  name: string,
  image?: string
}
export type ICityText = {
 id: number,
 createdAt: string,
 name: string,
 zipcode: string,
 country: string,
}

export type ICoupon = {
  id: string,
  name: string,
  startDate: string,
  endDate: string,
  discountPercent: number
}
export type IFilterPanel = IFilterDate & IParamPage & {
  cityId?: number,
  sortBy?: 'asc' | 'desc',
  priceRange?: string,
  name?: string,
}

export type IHistoryBooking = IParamPage & {
  type: number
}