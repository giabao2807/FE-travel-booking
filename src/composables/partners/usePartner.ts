/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerStore } from '@/store/partners'


const createPartner = () => {
  const partnerStore = usePartnerStore()
  const revenue = ref<any>()
  const staticBox = ref<any[]>([])
  const potentailCustomers = ref<any[]>([])
  const loadingCustomer = ref<boolean>(false)
  const getRevenue = async(params: any) => {
    await partnerStore.getRevenue(params)
      .then(data => { revenue.value = data })
  }
  const getStaticBox = async() => {
    partnerStore.getStaticBox()
      .then(data => staticBox.value = data)
  }
  const getPotentialCustomers = () => {
    loadingCustomer.value = true
    return partnerStore.getPotentialCustomers()
      .then(data => {
        potentailCustomers.value = data
        loadingCustomer.value = false
      })
  }
  return {
    revenue,
    staticBox,
    potentailCustomers,
    loadingCustomer,
    getStaticBox,
    getPotentialCustomers,
    getRevenue
  }
}
export const usePartner = createSharedComposable(createPartner)