import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IParamsAPI, IError } from './type'

const BASE_URL = 'http://127.0.0.1:8000/api/v1'


const connectionsAPI = async(paramsAPI: IParamsAPI) => {
  const { methods, path, params, headers, data, responseType, jwtToken } = paramsAPI
  const baseURL = BASE_URL + path
  const header = jwtToken ? { Authorization: `Bearer${jwtToken}` } : { 'Content-Type': 'application/json' }
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
      return errorInfo
    })
}

export default connectionsAPI