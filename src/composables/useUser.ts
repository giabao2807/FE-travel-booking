import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { createSharedComposable } from '@vueuse/core'
import { IError } from '@/libs/types/commonType'
import { useFeedBackStore } from '@/store/feedBack'
import { useLoading } from './useLoading'

const createUser = () => {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const feedBackStore = useFeedBackStore()
  const isEditInfo = ref<boolean>(false)
  const isEditContact = ref<boolean>(false)
  const { startLoading, finishLoading } = useLoading()
  const checkAvatar = computed(() => userInfo.value?.avatar || require('@/assets/img/avatar.png'))
  const updateUserInfo = (data: any) => {
    userStore.updateUserInfo(userInfo.value.id, data)
      .catch((error: IError) => {
        feedBackStore.setErrorInfo(error.data)
      })
  }
  const getUserInfo = async() => {
    startLoading()
    await userStore.getUserInfo()
    finishLoading()
    isEditInfo.value = false
    isEditContact.value = false
  }
  return {
    userInfo,
    isEditInfo,
    isEditContact,
    checkAvatar,
    updateUserInfo,
    getUserInfo
  }
}
export const useUserUtil = createSharedComposable(createUser)