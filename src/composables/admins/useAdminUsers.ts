/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import type { FormRules, FormInstance } from 'element-plus'
import { validations } from '@/helpers/validate'
import { useFeedBack } from '../useFeedBack'
import { convertionType } from '@/helpers/convertion'
import { useLoading } from '@/composables/useLoading'
import { useUserStore } from '@/store/user'


const createAdminUsers = () => {
  const userStore = useUserStore()
  const { convertFormDataWithOutList } = convertionType()
  const { startLoading, finishLoading } = useLoading()
  const {
    checkName,
    checkEmail,
    checkPhone,
    checkAddress
  } = validations()
  const { feedBack } = useFeedBack()
  const users = ref()
  const loadingUser = ref<boolean>(false)
  const dialogCreate = ref<boolean>(false)
  const selectFilter = ref<string>('Name')
  const filtersUser = ref<any>({
    name: '',
    role: ''
  })
  const formCreateUser = ref<any>({
    lastName: '',
    fistName: '',
    email: '',
    phone: '',
    address: ''
  })
  const formRef = ref()

  const rules = reactive<FormRules>({
    firstName: [{ validator: checkName }],
    lastName: [{ validator: checkName }],
    phone: [{ validator: checkPhone }],
    email: [{ validator: checkEmail }],
    address: [{ validator: checkAddress }]
  })
  const getUsers = (params?: any) => {
    loadingUser.value = true
    userStore.getUsers(params)
      .then(data => {
        users.value = data
        loadingUser.value = false
      })
  }
  const deactivateUser = async(id: string) => {
    await userStore.deactivateUser(id)
      .then(data => feedBack({
        title: 'Deactivate User',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Deactivate User',
        message: error,
        type:'error'
      }))
    getUsers({ ...filtersUser })
  }
  const activateUser = async(id: string) => {
    await userStore.activateUser(id)
      .then(data => feedBack({
        title: 'Activate User',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Activate User',
        message: error,
        type:'error'
      }))
    getUsers({ ...filtersUser })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const createUser = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid: any) => {
      if (valid) {
        startLoading()
        const formData = await convertFormDataWithOutList(formCreateUser.value)
        userStore.createUser(formData)
          .then(() => {
            finishLoading()
            dialogCreate.value = false
            resetForm(formEl)
            feedBack({
              title: 'Create User',
              message: 'Create success User',
              type:'success'
            })
          }).catch(error => {
            finishLoading()
            feedBack({
              title: 'Create User',
              message: error.data,
              type:'error'
            })
          })
      }
    })
  }

  return {
    users,
    loadingUser,
    formRef,
    rules,
    selectFilter,
    filtersUser,
    dialogCreate,
    formCreateUser,
    createUser,
    resetForm,
    getUsers,
    activateUser,
    deactivateUser
  }
}
export const useAdminUsers = createSharedComposable(createAdminUsers)