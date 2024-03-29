import { IAuthResponse, IGoogleSignInInput, ISignInInput, ISignUpInput } from '@/libs/types/authType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('authStore', () => {
  const initUser: IAuthResponse = {
    fullName: '',
    email: '',
    role: '',
    avatar: '',
    accessToken: '',
    refreshToken: ''
  }

  const authUser = ref<IAuthResponse>(initUser)
  const userSignIn = ref<ISignInInput>({
    email: '',
    password: ''
  })
  const googleSignIn = ref<IGoogleSignInInput>({
    token: ''
  })
  const userSignUp = ref<ISignUpInput>({
    lastName: '',
    firstName: '',
    gender: '',
    email: '',
    password: ''
  })
  const refreshTokenTimeout = ref<number>(30 * 60 * 1000)

  const refreshToken = async() => {
    const response = await connectionsAPI({
      methods: 'GET',
      path: 'user/action/refresh_new_token',
      params: { token: authUser.value?.refreshToken }
    })
    authUser.value.refreshToken = response.refreshToken || '',
    authUser.value.accessToken = response.accessToken || ''
    startRefreshTokenTimer()
  }
  const startRefreshTokenTimer = () => {
    sessionStorage.setItem('userData', JSON.stringify(authUser.value))
  }

  const stopRefreshTokenTimer = () => {
    clearInterval(refreshTokenTimeout.value)
  }
  const signInUser = async() => {
    authUser.value = await connectionsAPI({
      methods: 'POST',
      path: 'user/action/login',
      data: userSignIn.value
    })
    sessionStorage.setItem('userData', JSON.stringify(authUser.value))
  }

  const signUpUser = async() => {
    authUser.value = await connectionsAPI({
      methods: 'POST',
      path: 'user/action/sign_up',
      data: userSignUp.value
    })
    sessionStorage.setItem('userData', JSON.stringify(authUser.value))
  }

  const signInWithGoogle = async() => {
    authUser.value = await connectionsAPI({
      methods: 'POST',
      path: 'user/action/login_with_google',
      data: googleSignIn.value
    })
    sessionStorage.setItem('userData', JSON.stringify(authUser.value))
  }

  const resetAuthUser = () => {
    authUser.value = initUser
    stopRefreshTokenTimer()
    sessionStorage.clear()
  }

  const forgotPassword = async(email: string) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'user/action/forgot_password',
      data: { email: email }
    })
  }
  return {
    userSignIn,
    userSignUp,
    googleSignIn,
    authUser,
    refreshTokenTimeout,
    refreshToken,
    signInUser,
    signUpUser,
    signInWithGoogle,
    resetAuthUser,
    forgotPassword
  }
})
