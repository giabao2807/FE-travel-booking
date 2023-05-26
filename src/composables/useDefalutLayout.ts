import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useAuthStore } from '@/store/auth'
import { useAuthentication } from '@/composables/useAuth'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { storeToRefs } from 'pinia'

const createDefaultLayout = () => {
  const display = ref(useDisplay())
  const authStore = useAuthStore()
  const { authUser } = storeToRefs(authStore)
  const { checkAvatar, signOut } = useAuthentication()
  const slideValue = ref<number>()
  return {
    display,
    authUser,
    checkAvatar,
    slideValue,
    signOut
  }
}
export const useDefaultLayout = createSharedComposable(createDefaultLayout)