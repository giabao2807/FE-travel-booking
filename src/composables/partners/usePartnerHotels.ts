import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerHotelsStore } from '@/store/partners/hotels'
import { useHotelStore } from '@/store/hotels'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'

const createPartnerHotels = () => {
  const partnerHotelStore = usePartnerHotelsStore()
  const hotelStore = useHotelStore()
  const { startLoading, finishLoading } = useLoading()
  const { feedBack } = useFeedBack()
  const hotels = ref()
  const loadingHotels = ref<boolean>(false)
  const dialogUpdate = ref<boolean>(false)
  const formHotel = ref<any>()
  const idHotel = ref<string>()
  const imgListUpdate = ref<any[]>([])

  const getHotels = (params?: IParamPage) => {
    loadingHotels.value = true
    partnerHotelStore.getHotels(params)
      .then(data => {
        hotels.value = data
        loadingHotels.value = false
      })
  }
  const deactivateHotel = async(id: string) => {
    await partnerHotelStore.deactivateHotel(id)
      .then(data => feedBack({
        title: 'Deactivate Hotel',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Deactivate Hotel',
        message: error,
        type:'error'
      }))
    getHotels()
  }
  const activateHotel = async(id: string) => {
    await partnerHotelStore.activateHotel(id)
      .then(data => feedBack({
        title: 'Activate Hotel',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Activate Hotel',
        message: error,
        type:'error'
      }))
    getHotels()
  }
  const getHotelById = (id: string) => {
    hotelStore.getHotelSumaryById(id)
      .then(data => formHotel.value = data)
  }
  const updateHotel = (id: string) => {
    startLoading()
    formHotel.value.hotelImages?.push(...imgListUpdate.value),
    formHotel.value = {
      ...formHotel.value
    }
    partnerHotelStore.updateHotel(id, formHotel.value)
      .then(() => {
        handleRoute({ name: 'hotelsPartner' })
        finishLoading()
        feedBack({
          title: 'Update Hotel',
          message: 'Update success Hotel',
          type:'success'
        })
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Update Hotel',
          message: error,
          type:'error'
        })
      })
  }
  return {
    hotels,
    formHotel,
    idHotel,
    loadingHotels,
    dialogUpdate,
    getHotels,
    deactivateHotel,
    activateHotel,
    updateHotel,
    getHotelById
  }
}
export const usePartnerHotels = createSharedComposable(createPartnerHotels)