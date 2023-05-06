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

export type IError = {
  status?: string | number,
  message?: string,
  data?: any
}