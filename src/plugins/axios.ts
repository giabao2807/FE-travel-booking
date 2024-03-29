import { storeToRefs } from 'pinia'
import { IError, IParamsAPI } from '@/libs/types/commonType'
import { useAuthStore } from '@/store/auth'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
const BASE_URL = 'https://bonitravel.online/api/v1/'
const authHeader = () => {
  const authStore = useAuthStore()
  const { authUser } = storeToRefs(authStore)
  const session = sessionStorage.getItem('userData')
  authUser.value = session ? JSON.parse(session) : ''
  if (authUser.value.accessToken) {
    return { Authorization: `Bearer ${authUser.value.accessToken}` }
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
    headers: headers ? headers : header,
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