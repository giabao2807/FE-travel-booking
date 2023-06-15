import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerHotelsStore } from '@/store/partners/hotels'
import { useHotelStore } from '@/store/hotels'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { convertionType } from '@/helpers/convertion'

const createPartnerHotels = () => {
  const partnerHotelStore = usePartnerHotelsStore()
  const hotelStore = useHotelStore()
  const { startLoading, finishLoading } = useLoading()
  const { convertObjectToFormData } = convertionType()
  const { feedBack } = useFeedBack()
  const hotels = ref()
  const loadingHotels = ref<boolean>(false)
  const dialogUpdate = ref<boolean>(false)
  const dialogEditRoom = ref<boolean>(false)
  const imgListUpdate = ref<any[]>([])
  const formHotel = ref<any>({
    id: '',
    coverPicture: '',
    name: '',
    address: '',
    descriptions: '',
    rules: '',
    city: 0,
    hotelImages: []
  })
  const idHotel = ref<string>()

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
      .then(data => {
        formHotel.value = {
          ...data,
          hotelImages: data.listImages
        }
      })
  }
  const updateHotel = () => {
    startLoading()
    formHotel.value.hotelImages?.push(...imgListUpdate.value),
    formHotel.value = {
      ...formHotel.value,
      descriptions : `<section class="htdt-description clearfix bg-white br-8 pad-tb-15  mrg-b-15 ">${formHotel.value.descriptions}</section>`,
      rules: `<section class="htdt-policy clearfix bg-white br-8  mrg-b-15 pad-tb-15">${formHotel.value.rules}</section>`
    }
    partnerHotelStore.updateHotel(formHotel.value.id, convertObjectToFormData(formHotel.value, 'hotelImages'))
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
    imgListUpdate,
    dialogEditRoom,
    getHotels,
    deactivateHotel,
    activateHotel,
    updateHotel,
    getHotelById
  }
}
export const usePartnerHotels = createSharedComposable(createPartnerHotels)