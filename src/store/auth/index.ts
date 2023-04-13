import { ISignInInput, IUser } from './type'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('authStore', () => {
  const initUser = ref<IUser>({
    name: '',
    email: '',
    role: '',
    photo: '',
    accessToken: '',
    _id: '',
    id: '',
    created_at: '',
    updated_at: '',
    __v: 0
  })

  const authUser = ref<IUser>()
  const userSignIn = ref<ISignInInput>({
    username: '',
    password: ''
  })
  const signInUser = async() => {
    const response = await connectionsAPI({
      methods: 'POST',
      path: '/auth/login',
      headers: { 'Content-Type': 'application/json' },
      data: userSignIn.value,
      jwtToken: ''
    })
    const userInfo = ref<IUser>({
      ...initUser.value,
      name: response.username,
      accessToken: response.token,
      email: response.email,
      photo: response.image,
      role: response.gender
    })
    authUser.value = userInfo.value
    sessionStorage.setItem('userData', JSON.stringify(userInfo.value))
  }


  const resetAuthUser = () => {
    authUser.value = initUser.value
    sessionStorage.clear()
  }
  return {
    userSignIn,
    authUser,
    signInUser,
    resetAuthUser
  }
})
