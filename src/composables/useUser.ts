import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { createSharedComposable } from '@vueuse/core'
import { IError } from '@/libs/types/commonType'
import { useFeedBackStore } from '@/store/feedBack'

const createUser = () => {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const feedBackStore = useFeedBackStore()
  const isEditInfo = ref<boolean>(false)
  const isEditContact = ref<boolean>(false)
  const checkAvatar = computed(() => userInfo.value?.avatar || require('@/assets/img/avatar.png'))
  const updateUserInfo = (data: any) => {
    userStore.updateUserInfo(userInfo.value.id, { address: 'phuyen' })
      .catch((error: IError) => {
        feedBackStore.setErrorInfo(error.data)
      })
  }
  onMounted(async() => {
    await userStore.getUserInfo()
  })
  return {
    userInfo,
    isEditInfo,
    isEditContact,
    checkAvatar,
    updateUserInfo
  }
}
export const useUserUtil = createSharedComposable(createUser)