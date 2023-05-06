import { useFeedBackStore } from './../store/feedBack'
import { IError } from './../plugins/type'
import { createSharedComposable } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoading } from '@/composables/useLoading'
const GENDER_DATA = [{ value: 1, name: 'Male' }, { value: 2, name: 'FeMale' }, { value: 3, name: 'Other' }]
const useAuth = () => {
  const authStore = useAuthStore()
  const feedBackStore = useFeedBackStore()
  const { userSignIn, userSignUp } = storeToRefs(authStore)
  const { initError } = storeToRefs(feedBackStore)
  const { startLoading, finishLoading } = useLoading()
  const showPassword = ref<boolean>(false)
  const showConfirmPassword = ref<boolean>(false)
  const rememberMe = ref<boolean>(false)

  const signIn = async() => {
    startLoading()
    await authStore.signInUser().then(() => router.push('/dashboard'))
      .catch((error: IError) => {
        feedBackStore.setErrorInfo(error.data)
      })
    finishLoading()
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
    startLoading()
    await authStore.signUpUser().then(() => router.push('/'))
      .catch((error: IError) => {
        feedBackStore.setErrorInfo(error.data)
      })
    finishLoading()
  }

  const signUpWithGoogle = () => {}
  onMounted(() => {
    isRememberMe()
  })
  return {
    userSignIn,
    userSignUp,
    showPassword,
    showConfirmPassword,
    rememberMe,
    GENDER_DATA,
    initError,
    isRememberMe,
    signIn,
    signUp,
    signInWithGoogle,
    signUpWithGoogle
  }
}
export const useAuthentication = createSharedComposable(useAuth)