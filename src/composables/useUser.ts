import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { createSharedComposable } from '@vueuse/core'

const createUser = () => {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  onMounted(() => {
    userStore.getUserInfo()
  })
  return {
    userInfo
  }
}
export const useUserUtil = createSharedComposable(createUser)