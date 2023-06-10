import { computed, onMounted, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useAuthStore } from '@/store/auth'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoading } from '@/composables/useLoading'
import { IError } from '@/libs/types/commonType'
import { GENDER_DATA } from '@/resources/mockData'
import { useFeedBack } from './useFeedBack'

const useAuth = () => {
  const authStore = useAuthStore()
  const { userSignIn, userSignUp, authUser, refreshTokenTimeout } = storeToRefs(authStore)
  const { startLoading, finishLoading } = useLoading()
  const showPassword = ref<boolean>(false)
  const showConfirmPassword = ref<boolean>(false)
  const emailForgot = ref<string>('')
  const rememberMe = ref<boolean>(false)
  const formRef = ref()
  const { feedBack } = useFeedBack()

  const signIn = async() => {
    const { valid } = await formRef.value.validate()
    if (valid) {
      startLoading()
      await authStore.signInUser().then(() => router.push('/dashboard/admin'))
        .catch((error: IError) => {
          feedBack(error.data)
        })
      finishLoading() }
  }

  const isRememberMe = () => {
    if (rememberMe.value && userSignIn.value.email !== '') {
      localStorage.email = userSignIn.value.email
      localStorage.checkbox = rememberMe.value
    } else {
      localStorage.username = ''
      localStorage.checkbox = ''
    }
  }

  const signInWithGoogle = () => {}

  const signUp = async() => {
    const { valid } = await formRef.value.validate()
    if (valid) {
      startLoading()
      await authStore.signUpUser().then(() => router.push('/'))
        .catch((error: IError) => {
          feedBack(error.data)
        })
      finishLoading()
    }
  }

  const signUpWithGoogle = () => {}
  const signOut = () => {
    startLoading()
    authStore.resetAuthUser()
    finishLoading()
    router.push({ name: 'signIn' })
  }
  const forgotPassword = (email: string) => {
    authStore.forgotPassword(email)
  }

  const checkAvatar = computed(() => authUser.value?.avatar || require('@/assets/img/avatar.png'))
  const routeDirectional = (sessionUser: any) => {
    if (sessionUser){
      if (sessionUser?.role === 'Admin'){
        router.push('/dashboard/admin')
      }
      else if (sessionUser?.role === 'Partner') {
        router.push('/dashboard/partner')
      }
      else {
        router.push('/')
      }
    }
  }
  setInterval(() => {
    authStore.refreshToken()
  }, refreshTokenTimeout.value)
  onMounted(() => {
    const session = sessionStorage.getItem('userData')
    authUser.value = session ? JSON.parse(session) : ''
    routeDirectional(authUser.value)
  })
  return {
    userSignIn,
    userSignUp,
    showPassword,
    showConfirmPassword,
    formRef,
    rememberMe,
    GENDER_DATA,
    checkAvatar,
    authUser,
    refreshTokenTimeout,
    emailForgot,
    routeDirectional,
    isRememberMe,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signUpWithGoogle,
    forgotPassword
  }
}
export const useAuthentication = createSharedComposable(useAuth)