/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import type { FormRules, FormInstance } from 'element-plus'
import { validations } from '@/helpers/validate'
import { useFeedBack } from '../useFeedBack'
import { convertionType } from '@/helpers/convertion'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { useCities } from '../useCities'
import { useUserStore } from '@/store/user'


const createAdminUsers = () => {
  const userStore = useUserStore()
  const { getCityByName } = useCities()
  const { deCode, convertFormDataWithOutList } = convertionType()
  const { startLoading, finishLoading } = useLoading()
  const {
    checkQuantity,
    checkCash,
    checkLength,
    checkName,
    checkCoverImage,
    checkCity,
    checkDeparture,
    checkTraffics,
    checkDay
  } = validations()
  const { feedBack } = useFeedBack()
  const users = ref()
  const loadingUser = ref<boolean>(false)
  const imgListUpdate = ref<any[]>([])
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

  // const rules = reactive<FormRules>({
  //   name: [{ validator: checkName }],
  //   coverPicture: [{ validator: checkCoverImage }],
  //   groupSize: [{ validator: checkQuantity }],
  //   city: [{ validator: checkCity }],
  //   departure: [{ validator: checkDeparture }],
  //   price: [{ validator: checkCash }],
  //   descriptions: [{ validator: checkLength }],
  //   scheduleContent: [
  //     { validator: checkLength }
  //   ],
  //   note: [
  //     { validator: checkLength }
  //   ],
  //   traffics: [{ validator: checkTraffics }],
  //   totalDay: [{ validator: checkDay }],
  //   totalNight: [{ validator: checkNight }]
  // })


  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const getUsers = (params?: any) => {
    loadingUser.value = true
    userStore.getUsers(params)
      .then(data => {
        users.value = data
        loadingUser.value = false
      })
  }
  const createUser = async() => {
    startLoading()
    const formData = await convertFormDataWithOutList(formCreateUser.value)
    userStore.createUser(formData)
      .then(() => {
        finishLoading()
        dialogCreate.value = false
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

  return {
    users,
    loadingUser,
    formRef,
    selectFilter,
    filtersUser,
    dialogCreate,
    formCreateUser,
    createUser,
    resetForm,
    getUsers
  }
}
export const useAdminUsers = createSharedComposable(createAdminUsers)