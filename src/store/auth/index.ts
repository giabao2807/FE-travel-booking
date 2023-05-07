import { IAuthResponse, IRefreshToken, ISignInInput, ISignUpInput } from '@/libs/types/authType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('authStore', () => {
  const initUser = ref<IAuthResponse>({
    fullName: '',
    email: '',
    role: '',
    avatar: '',
    accessToken: '',
    refreshToken: ''
  })

  const authUser = ref<IAuthResponse>()
  const authToken = ref<IRefreshToken>()
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
    authToken.value = await connectionsAPI({
      methods: 'GET',
      path: '/user/action/refresh_new_token',
      params: authToken.value?.refreshToken
    })
    startRefreshTokenTimer()
  }
  const startRefreshTokenTimer = () => {
    const jwtToken = authToken.value?.accessToken ? JSON.parse(authToken.value?.accessToken) : ''
    console.log(jwtToken)

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
      fullName: response.fullName,
      email: response.email,
      role: response.role,
      avatar: response.avatar,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
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
      fullName: response.fullName,
      email: response.email,
      role: response.role,
      avatar: response.avatar,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
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
