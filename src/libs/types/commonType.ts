import { Method, ResponseType } from 'axios'

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