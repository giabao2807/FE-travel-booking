
import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserrStore = defineStore('userStore', () => {
  const userInfo = ref<any>()

  return {
  }
})
