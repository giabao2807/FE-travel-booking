import { ref } from 'vue'
import { defineStore } from 'pinia'
export type IError = {
  status?: string | number,
  message?: string,
  data?: any
}
export const useFeedBackStore = defineStore('feedBackStore', () => {
  const initError = ref<IError>({
    status: '',
    message: '',
    data: ''
  })
  const setErrorInfo = (error: IError) => {
    initError.value = error
  }

  return {
    initError,
    setErrorInfo
  }
})
