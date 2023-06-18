import { computed } from 'vue'

export const checkInfo = () => {
  const isSignIn = computed(() => {
    const session = sessionStorage.getItem('userData')
    return !!session
  })
  const isFullContact = computed(() => {
    const session = sessionStorage.getItem('userData')
    if (session) {
      const data = JSON.parse(session)
      return data?.phone ? true : false
    }
    return false
  })
  return {
    isSignIn,
    isFullContact
  }
}