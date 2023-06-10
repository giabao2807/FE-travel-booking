import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerStore } from '@/store/partners'


const createPartner = () => {
  const partnerStore = usePartnerStore()
  const revenue = ref<any>()
  const staticBox = ref<any[]>([])
  const potentailCustomers = ref<any[]>([])
  const getRevenue = async(params: any) => {
    await partnerStore.getRevenue(params)
      .then(data => { revenue.value = data })
  }
  const getStaticBox = async() => {
    partnerStore.getStaticBox()
      .then(data => staticBox.value = data)
  }
  const getPotentialCustomers = () => {
    return partnerStore.getPotentialCustomers()
      .then(data => potentailCustomers.value = data)
  }
  return {
    revenue,
    staticBox,
    potentailCustomers,
    getStaticBox,
    getPotentialCustomers,
    getRevenue
  }
}
export const usePartner = createSharedComposable(createPartner)