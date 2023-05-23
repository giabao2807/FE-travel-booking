import { ref } from 'vue'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<any>({
    id: '',
    email: '',
    avatar: '',
    lastName: '',
    firstName: '',
    gender: 2,
    birthday: '',
    address: '',
    phone: ''
  })
  const getUserInfo = async() => {
    console.log('in here')
    await connectionsAPI({
      methods: 'GET',
      path: 'user/info'
    }).then(data => userInfo.value = data)
  }
  const updateUserInfo = async(id: string, data: any) => {
    await connectionsAPI({
      methods: 'PUT',
      path: `user/${id}`,
      data: data
    }).then(data => userInfo.value = data)
  }
  return {
    userInfo,
    getUserInfo,
    updateUserInfo
  }
})
