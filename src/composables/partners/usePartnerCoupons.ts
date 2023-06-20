import { ref, reactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { useCouponsStore } from '@/store/coupons'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { FormInstance, FormRules } from 'element-plus'
import { validations } from '@/helpers/validate'

const createCoupons = () => {
  const couponsStore = useCouponsStore()
  const { feedBack } = useFeedBack()
  const { startLoading, finishLoading } = useLoading()
  const {
    checkPercent,
    checkLength,
    checkName,
    checkTimes,
    checkMultiTours,
    checkMultiHotels
  } = validations()
  const coupons = ref()
  const tours = ref<any[]>([])
  const hotels = ref<any[]>([])
  const formRef = ref()
  const formCoupon = ref({
    hotelIds: [],
    tourIds: [],
    name: '',
    description: '',
    rangeDate: '',
    startDate: '',
    endDate: '',
    discountPercent: 0
  })
  const loadingCoupons = ref<boolean>(false)
  const rulesCoupon = reactive<FormRules>({
    name: [{ validator: checkName }],
    discountPercent: [{ validator: checkPercent }],
    description: [{ validator: checkLength }],
    hotelIds: [{ validator: checkMultiHotels }],
    tourIds: [{ validator: checkMultiTours }],
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
  const getTours = () => {
    couponsStore.getToursForCoupon()
      .then(data => tours.value = data)
  }
  const getHotels = () => {
    couponsStore.getHotelsForCoupon()
      .then(data => hotels.value = data)
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
            handleRoute({ name: 'couponsPartner' })
            finishLoading()
            feedBack({
              title: 'Create Coupon',
              message: 'Create success coupon',
              type:'success'
            })
          }).catch(error => {
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
  return {
    coupons,
    tours,
    hotels,
    loadingCoupons,
    formCoupon,
    formRef,
    rulesCoupon,
    resetForm,
    getCoupons,
    deleteCoupon,
    getTours,
    getHotels,
    createCoupon
  }
}
export const usePartnerCoupons = createSharedComposable(createCoupons)