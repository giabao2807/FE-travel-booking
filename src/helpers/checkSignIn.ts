import { computed } from 'vue'

export const checkInfo = () => {
  const isSignIn = computed(() => {
    const session = sessionStorage.getItem('userData')
    return !!session
  })
  return {
    isSignIn
  }
}