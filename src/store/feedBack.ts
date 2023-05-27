import { IError } from '@/libs/types/commonType'
import { defineStore } from 'pinia'
import { ref } from 'vue'


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
