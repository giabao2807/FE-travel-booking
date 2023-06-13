import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { useCouponsStore } from '@/store/coupons'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'

const createPartnerCoupons = () => {
  const couponsStore = useCouponsStore()
  const { feedBack } = useFeedBack()
  const { startLoading, finishLoading } = useLoading()
  const coupons = ref()
  const tours = ref<any[]>([])
  const hotels = ref<any[]>([])
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
  const createCoupon = () => {
    startLoading()
    formCoupon.value = {
      ...formCoupon.value,
      startDate: formCoupon.value.rangeDate[0],
      endDate: formCoupon.value.rangeDate[1]
    }
    couponsStore.createPartnerCoupons(formCoupon.value)
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
  return {
    coupons,
    tours,
    hotels,
    loadingCoupons,
    formCoupon,
    getCoupons,
    deleteCoupon,
    getTours,
    getHotels,
    createCoupon
  }
}
export const usePartnerCoupons = createSharedComposable(createPartnerCoupons)