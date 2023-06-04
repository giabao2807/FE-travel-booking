import { ref, computed } from 'vue'
import { useFeedBack } from './useFeedBack'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { createSharedComposable } from '@vueuse/core'
import { IError } from '@/libs/types/commonType'
import { useLoading } from './useLoading'

const createUser = () => {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const isEditInfo = ref<boolean>(false)
  const isEditContact = ref<boolean>(false)
  const { startLoading, finishLoading } = useLoading()
  const { feedBack } = useFeedBack()
  const checkAvatar = computed(() => userInfo.value?.avatar || require('@/assets/img/avatar.png'))
  const updateUserInfo = (data: any) => {
    userStore.updateUserInfo(userInfo.value.id, data)
      .catch((error: IError) => {
        feedBack(error.data)
        finishLoading()
      })
    isEditInfo.value = false
    isEditContact.value = false
  }
  const getUserInfo = async() => {
    startLoading()
    await userStore.getUserInfo()
      .then(data => {
        userInfo.value = data
        console.log(userInfo.value)
        finishLoading()
      })
      .catch(error => {
        feedBack(error.data)
        finishLoading()
      })
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