import { ref } from 'vue'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<any>()
  const getUserInfo = async() => {
    await connectionsAPI({
      methods: 'GET',
      path: 'user/info'
    }).then(data => userInfo.value = data)
  }
  return {
    userInfo,
    getUserInfo
  }
})
