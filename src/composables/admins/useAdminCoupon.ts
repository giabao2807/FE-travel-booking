/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, reactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { useCouponsStore } from '@/store/coupons'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { FormInstance, FormRules } from 'element-plus'
import { validations } from '@/helpers/validate'

const createAdminCoupons = () => {
  const couponsStore = useCouponsStore()
  const { feedBack } = useFeedBack()
  const { startLoading, finishLoading } = useLoading()
  const {
    checkPercent,
    checkLength,
    checkName,
    checkTimes
  } = validations()
  const coupons = ref()
  const partners = ref<any[]>([])
  const formRef = ref()
  const formCoupon = ref({
    partnerIds: [],
    name: '',
    description: '',
    rangeDate: '',
    startDate: '',
    endDate: '',
    forAll: false,
    discountPercent: 0
  })
  const loadingCoupons = ref<boolean>(false)
  const rulesCoupon = reactive<FormRules>({
    name: [{ validator: checkName }],
    discountPercent: [{ validator: checkPercent }],
    description: [{ validator: checkLength }],
    rangeDate: [{ validator: checkTimes }]
  })
  const getCoupons = (params?: IParamPage) => {
    loadingCoupons.value = true
    couponsStore.getCoupons(params)
      .then(data => {
        coupons.value = data
        loadingCoupons.value = false
      })
  }
  const deleteCoupon = async(id: string) => {
    await couponsStore.deleteCoupon(id)
      .then(data => feedBack({
        title: 'Delete Coupon',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Delete Coupon',
        message: error,
        type:'error'
      }))
    getCoupons()
  }
  const getPartners = () => {
    couponsStore.getPartnersForCoupon()
      .then(data => partners.value = data)
  }
  const createCoupon = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid) => {
      if (valid) {
        startLoading()
        formCoupon.value = {
          ...formCoupon.value,
          startDate: formCoupon.value.rangeDate[0],
          endDate: formCoupon.value.rangeDate[1]
        }
        await couponsStore.createCoupons(formCoupon.value)
          .then(() => {
            handleRoute({ name: 'couponsAdmin' })
            finishLoading()
            feedBack({
              title: 'Create Coupon',
              message: 'Create success coupon',
              type:'success'
            })
          }).catch((error: any) => {
            finishLoading()
            feedBack({
              title: 'Create Coupon',
              message: error,
              type:'error'
            })
          })
      }
    })
  }
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const pickerEndDisable = (time: any) => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return time < yesterday
  }
  return {
    coupons,
    partners,
    loadingCoupons,
    formCoupon,
    formRef,
    rulesCoupon,
    pickerEndDisable,
    resetForm,
    getCoupons,
    deleteCoupon,
    getPartners,
    createCoupon
  }
}
export const useAdminCoupons = createSharedComposable(createAdminCoupons)