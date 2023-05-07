import { ref } from 'vue'
import { defineStore } from 'pinia'
import { IError } from '@/libs/types/commonType'
export const useFeedBackStore = defineStore('feedBackStore', () => {
  const initError = ref<IError>({
    title: 'Error',
    message: '',
    type: 'error'
  })
  const setErrorInfo = (error: IError) => {
    initError.value.message = error.message
  }

  return {
    initError,
    setErrorInfo
  }
})
