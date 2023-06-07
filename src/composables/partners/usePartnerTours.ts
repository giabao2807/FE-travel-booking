import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerToursStore } from '@/store/partners/tours'
import { IParamPage } from '@/libs/types/commonType'


const createPartnerTours = () => {
  const partnerTourStore = usePartnerToursStore()
  const tours = ref()
  const getTours = (params?: IParamPage) => {
    partnerTourStore.getTours(params)
      .then(data => tours.value = data)
  }
  return {
    tours,
    getTours
  }
}
export const usePartnerTours = createSharedComposable(createPartnerTours)