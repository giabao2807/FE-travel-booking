import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'
import { useAuthStore } from '@/store/auth'
import { useAuthentication } from '@/composables/useAuth'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { storeToRefs } from 'pinia'
import { HEADER_TAB } from '@/resources/mockData'

const createDefaultLayout = () => {
  const display = ref(useDisplay())
  const authStore = useAuthStore()
  const { authUser } = storeToRefs(authStore)
  const { checkAvatar, signOut } = useAuthentication()
  const slideValue = ref<number>()
  const showBookingPage = (name: string) => {
    if (name === 'Booking' || name === 'Favorite') {
      return authUser.value.accessToken ? true : false
    }
    return true
  }

  const route = useRoute()
  onMounted(async() => {
    const session = await sessionStorage.getItem('userData')
    authUser.value = session ? JSON.parse(session) : ''
    slideValue.value = HEADER_TAB.find(item => item.name.toLowerCase() === route.name)?.value
  })
  return {
    display,
    authUser,
    checkAvatar,
    slideValue,
    showBookingPage,
    signOut
  }
}
export const useDefaultLayout = createSharedComposable(createDefaultLayout)