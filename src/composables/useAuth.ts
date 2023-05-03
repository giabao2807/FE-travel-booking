import { createSharedComposable } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { useLoading } from '@/composables/useLoading'
const GENDER_DATA = [{ value: 1, name: 'Male' }, { value: 2, name: 'FeMale' }, { value: 3, name: 'Other' }]
const useAuth = () => {
  const authStore = useAuthStore()
  const { userSignIn } = storeToRefs(authStore)
  const { startLoading, finishLoading } = useLoading()
  const showPassword = ref<boolean>(false)
  const showConfirmPassword = ref<boolean>(false)
  const rememberMe = ref<boolean>(false)

  const signIn = async() => {
    startLoading()
    await authStore.signInUser()
    finishLoading()
    router.push('/dashboard')
  }

  const isRememberMe = () => {
    if (rememberMe.value && userSignIn.value.username !== '') {
      localStorage.username = userSignIn.value.username
      localStorage.checkbox = rememberMe.value
    } else {
      localStorage.username = ''
      localStorage.checkbox = ''
    }
  }

  const signInWithGoogle = () => {}

  const signUp = () => {}

  const signUpWithGoogle = () => {}
  onMounted(() => {
    isRememberMe()
  })
  return {
    userSignIn,
    showPassword,
    showConfirmPassword,
    rememberMe,
    GENDER_DATA,
    isRememberMe,
    signIn,
    signUp,
    signInWithGoogle,
    signUpWithGoogle
  }
}
export const useAuthentication = createSharedComposable(useAuth)