/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from '@/composables/useLoading'
import { useFeedBack } from './useFeedBack'
import { useUserStore } from '@/store/user'

const createChangePassword = () => {
  const userStore = useUserStore()
  const { feedBack } = useFeedBack()
  const { startLoading, finishLoading } = useLoading()
  const openDialogChangePass = ref<boolean>(false)
  const formRef = ref()
  const paramChangePass = ref<any>({
    newPassword: '',
    oldPassword: ''
  })
  const resetSearch = () => {
    const ref = formRef.value
    ref?.reset()
  }
  const changePassword = async() => {
    const { valid } = await formRef.value.validate()
    if (valid) {
      startLoading()
      await userStore.changePassword(paramChangePass.value)
        .then(data => {
          finishLoading()
          openDialogChangePass.value = false
          resetSearch
          feedBack({
            title: 'Change Password',
            message: 'Change Password Success',
            type:'success'
          })
        })
        .catch(error => {
          feedBack({
            title: 'Change Password',
            message: error?.data.errorMessage,
            type:'error'
          })
          finishLoading()
        })
    }
  }

  return {
    paramChangePass,
    changePassword,
    formRef,
    resetSearch,
    openDialogChangePass
  }
}
export const useChangePassword = createSharedComposable(createChangePassword)