import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerHotelsStore } from '@/store/partners/hotels'


const createPartnerHotels = () => {
  const partnerHotelstore = usePartnerHotelsStore()
  const hotels = ref()
  const loadingHotels = ref<boolean>(false)
  const getHotels = (params?: IParamPage) => {
    loadingHotels.value = true
    partnerHotelstore.getHotels(params)
      .then(data => {
        hotels.value = data
        loadingHotels.value = false
      })
  }
  return {
    hotels,
    loadingHotels,
    getHotels
  }
}
export const usePartnerHotels = createSharedComposable(createPartnerHotels)