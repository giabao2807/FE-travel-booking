import { ref, computed, onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'

const createUser = () => {

  return {
  }
}
export const useUserUtil = createSharedComposable(createUser)