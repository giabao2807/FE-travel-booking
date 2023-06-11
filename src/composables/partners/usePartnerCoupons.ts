import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { useCouponsStore } from '@/store/coupons'


const createPartnerCoupons = () => {
  const couponsStore = useCouponsStore()
  const coupons = ref()
  const loadingCoupons = ref<boolean>(false)
  const getCoupons = (params?: IParamPage) => {
    loadingCoupons.value = true
    couponsStore.getCoupons(params)
      .then(data => {
        coupons.value = data
        loadingCoupons.value = false
      })
  }
  return {
    coupons,
    loadingCoupons,
    getCoupons
  }
}
export const usePartnerCoupons = createSharedComposable(createPartnerCoupons)