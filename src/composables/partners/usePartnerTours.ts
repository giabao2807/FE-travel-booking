import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerToursStore } from '@/store/partners/tours'
import { IParamPage } from '@/libs/types/commonType'


const createPartnerTours = () => {
  const partnerTourStore = usePartnerToursStore()
  const tours = ref()
  const loadingTours = ref<boolean>(false)
  const getTours = (params?: IParamPage) => {
    loadingTours.value = true
    partnerTourStore.getTours(params)
      .then(data => {
        tours.value = data
        loadingTours.value = false
      })
  }
  const deactivateTour = (id: string) => {
    partnerTourStore.deactivateTour(id)
    getTours()
  }
  const activateTour = (id: string) => {
    partnerTourStore.activateTour(id)
    getTours()
  }
  return {
    tours,
    loadingTours,
    getTours,
    deactivateTour,
    activateTour
  }
}
export const usePartnerTours = createSharedComposable(createPartnerTours)