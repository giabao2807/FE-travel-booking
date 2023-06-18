/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed } from 'vue'
import { useFeedBack } from './useFeedBack'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { createSharedComposable } from '@vueuse/core'
import { IError } from '@/libs/types/commonType'
import { useLoading } from './useLoading'
import { useAuthStore } from '@/store/auth'

const createUser = () => {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const authStore = useAuthStore()
  const { authUser } = storeToRefs(authStore)
  const isEditInfo = ref<boolean>(false)
  const isEditContact = ref<boolean>(false)
  const showName = ref<string>()
  const fileAvatar = ref<FormData>()
  const inForRef = ref()
  const { startLoading, finishLoading } = useLoading()
  const { feedBack } = useFeedBack()
  const checkAvatar = computed(() => authUser.value?.avatar || require('@/assets/img/avatar.png'))
  const updateUserInfo = async(data: any) => {
    const { valid } = await inForRef.value.validate()
    if (valid) {
      startLoading()
      userStore.updateUserInfo(userInfo.value.id, data)
        .then(response => {
          authUser.value = {
            ...authUser.value,
            fullName: response.lastName + ' ' + response.firstName,
            avatar: response.avatar
          }
          sessionStorage.setItem('userData', JSON.stringify(authUser.value))
          finishLoading()
        })
        .catch((error: IError) => {
          feedBack(error.data)
          finishLoading()
        })
      isEditInfo.value = false
      isEditContact.value = false
    }
  }
  const getUserInfo = async() => {
    startLoading()
    await userStore.getUserInfo()
      .then(data => {
        userInfo.value = data
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
    showName,
    fileAvatar,
    inForRef,
    updateUserInfo,
    getUserInfo
  }
}
export const useUserUtil = createSharedComposable(createUser)