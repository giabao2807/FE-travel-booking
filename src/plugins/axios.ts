import { IError, IParamsAPI } from '@/libs/types/commonType'
import { useAuthStore } from '@/store/auth'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
const BASE_URL = 'http://bonitravel.online/api/v1/'
const authHeader = () => {
  const { authUser } = useAuthStore()
  const isLoggedIn = !!authUser?.accessToken
  if (isLoggedIn) {
    return { Authorization: `Bearer ${authUser.accessToken}` }
  } else {
    return { 'Content-Type': 'application/json' }
  }
}
const connectionsAPI = async(paramsAPI: IParamsAPI) => {
  const { methods, path, params, headers, data, responseType } = paramsAPI
  const baseURL = BASE_URL + path
  const header = authHeader()
  const config: AxiosRequestConfig = {
    method: methods,
    url: baseURL,
    params: params ? params : undefined,
    data: data ? data : undefined,
    headers: header ? header : headers,
    responseType:  responseType ? responseType : 'json'
  }
  return await axios(config)
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      const errorInfo: IError = {
        status: error.status,
        message: error.message,
        data: error.response?.data
      }
      return Promise.reject(errorInfo)
    })
}

export default connectionsAPI