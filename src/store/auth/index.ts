import { ISignInInput, IAuthResponse, ISignUpInput } from './type'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('authStore', () => {
  const initUser = ref<IAuthResponse>({
    full_name: '',
    email: '',
    role: '',
    avatar: '',
    accessToken: '',
    refreshToken: ''
  })

  const authUser = ref<IAuthResponse>()
  const userTest = ref()
  const userSignIn = ref<ISignInInput>({
    email: '',
    password: ''
  })
  const userSignUp = ref<ISignUpInput>({
    lastName: '',
    firstName: '',
    gender: '',
    email: '',
    password: ''
  })
  const refreshTokenTimeout = ref<number>(0)

  const refreshToken = async() => {
    userTest.value = await connectionsAPI({
      methods: 'GET',
      path: '/user/action/refresh_new_token',
      params: userTest.value.jwtToken,
      jwtToken: ''
    })
    startRefreshTokenTimer()
  }
  const startRefreshTokenTimer = () => {
    const jwtToken = JSON.parse(userTest.value.jwtToken)
    const expires = new Date(jwtToken.exp * 1000)
    const timeout = expires.getTime() - Date.now() - (60 * 1000)
    refreshTokenTimeout.value = setTimeout(refreshToken, timeout)
  }

  const stopRefreshTokenTimer = () => {
    clearTimeout(refreshTokenTimeout.value)
  }
  const signInUser = async() => {
    const response = await connectionsAPI({
      methods: 'POST',
      path: 'user/action/login',
      data: userSignIn.value
    })
    const userInfo: IAuthResponse = ({
      full_name: response.full_name,
      email: response.email,
      role: response.role,
      avatar: response.avatar,
      accessToken: response.access_token,
      refreshToken: response.refresh_token
    })
    authUser.value = userInfo
    sessionStorage.setItem('userData', JSON.stringify(userInfo))
    return response
  }

  const signUpUser = async() => {
    const response = await connectionsAPI({
      methods: 'POST',
      path: 'user/action/sign_up',
      data: userSignUp.value
    })
    const userInfo: IAuthResponse = ({
      full_name: response.full_name,
      email: response.email,
      role: response.role,
      avatar: response.avatar,
      accessToken: response.access_token,
      refreshToken: response.refresh_token
    })
    authUser.value = userInfo
    sessionStorage.setItem('userData', JSON.stringify(userInfo))
    return response
  }


  const resetAuthUser = () => {
    authUser.value = initUser.value
    stopRefreshTokenTimer()
    sessionStorage.clear()
  }
  return {
    userSignIn,
    userSignUp,
    authUser,
    signInUser,
    signUpUser,
    resetAuthUser
  }
})
