import { useFeedBackStore } from '@/store/feedBack'
import { createSharedComposable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoading } from '@/composables/useLoading'
import { ElNotification } from 'element-plus'
import { IError, IFeedBack } from '@/libs/types/commonType'
import { GENDER_DATA } from '@/resources/mockData'

const useAuth = () => {
  const authStore = useAuthStore()
  const feedBackStore = useFeedBackStore()
  const { userSignIn, userSignUp, authUser, refreshTokenTimeout } = storeToRefs(authStore)
  const { initError } = storeToRefs(feedBackStore)
  const { startLoading, finishLoading } = useLoading()
  const showPassword = ref<boolean>(false)
  const showConfirmPassword = ref<boolean>(false)
  const rememberMe = ref<boolean>(false)
  const formRef = ref()
  const feedBack = (data: IFeedBack) => {
    ElNotification({
      title: data.title,
      message: data.message,
      type: data.type,
      position: 'bottom-right'
    })
  }

  const signIn = async() => {
    const { valid } = await formRef.value.validate()
    if (valid) {
      startLoading()
      await authStore.signInUser().then(() => router.push('/dashboard'))
        .catch((error: IError) => {
          feedBackStore.setErrorInfo(error.data)
          feedBack(initError.value)
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
          feedBackStore.setErrorInfo(error.data)
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
  const refreshToken = () => {
    authStore.refreshToken()
  }
  return {
    userSignIn,
    userSignUp,
    showPassword,
    showConfirmPassword,
    formRef,
    rememberMe,
    GENDER_DATA,
    initError,
    checkAvatar,
    authUser,
    refreshTokenTimeout,
    routeDirectional,
    isRememberMe,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signUpWithGoogle,
    refreshToken
  }
}
export const useAuthentication = createSharedComposable(useAuth)