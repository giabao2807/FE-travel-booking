import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerHotelsStore } from '@/store/partners/hotels'
import { useHotelStore } from '@/store/hotels'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { convertionType } from '@/helpers/convertion'

type ICreateRoom = {
  name: string,
  beds: number,
  adults: number,
  children: number,
  description: string,
  price: number,
  square: number,
  quantity: number,
  roomImages: any[]
}
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
  const idHotel = ref<string>('')
  const step = ref<number>(1)
  const initDataRoom: ICreateRoom = {
    name: '',
    beds: 0,
    adults: 0,
    children: 0,
    description: '',
    price: 0,
    square: 0,
    quantity: 0,
    roomImages: []
  }
  const dataFormRoom = ref<ICreateRoom[]>([initDataRoom])
  const addNewRoom = () => {
    dataFormRoom.value.push({
      name: '',
      beds: 0,
      adults: 0,
      children: 0,
      description: '',
      price: 0,
      square: 0,
      quantity: 0,
      roomImages: []
    })
  }
  const removeRoom = (id: number) => {
    dataFormRoom.value = dataFormRoom.value.filter((item, idx) => idx !== id)
  }
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
    startLoading()
    hotelStore.getHotelSumaryById(id)
      .then(data => {
        formHotel.value = {
          ...data,
          hotelImages: data.listImages
        }
        finishLoading()
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Get Hotel By Id',
          message: error?.data,
          type:'error'
        })
      })
  }
  const createHotel = async() => {
    startLoading()
    const dataCreate = await({
      ...formHotel.value,
      descriptions : `<section class="htdt-description clearfix bg-white br-8 pad-tb-15  mrg-b-15 ">${formHotel.value.descriptions}</section>`,
      rules: `<section class="htdt-policy clearfix bg-white br-8  mrg-b-15 pad-tb-15">${formHotel.value.rules}</section>`
    })
    const formData = await convertObjectToFormData(dataCreate, 'hotelImages')
    partnerHotelStore.createHotel(formData)
      .then(data => {
        idHotel.value = data.id
        step.value++
        finishLoading()
        feedBack({
          title: 'Create Hotel',
          message: 'Create success Hotel',
          type:'success'
        })
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Create Hotel',
          message: error,
          type:'error'
        })
      })
  }
  const updateHotel = async() => {
    startLoading()
    formHotel.value.hotelImages?.push(...imgListUpdate.value)
    const dataUpdate = await({
      ...formHotel.value,
      descriptions : `<section class="htdt-description clearfix bg-white br-8 pad-tb-15  mrg-b-15 ">${formHotel.value.descriptions}</section>`,
      rules: `<section class="htdt-policy clearfix bg-white br-8  mrg-b-15 pad-tb-15">${formHotel.value.rules}</section>`
    })
    const formData = await convertObjectToFormData(dataUpdate, 'hotelImages')
    partnerHotelStore.updateHotel(formHotel.value.id, formData)
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
  const createRoom = async(data: any) => {
    startLoading()
    const formData = await convertObjectToFormData(data, 'roomImages')
    partnerHotelStore.createRoom(idHotel.value, formData)
      .then(data => {
        finishLoading()
        feedBack({
          title: `Create Room ${data.name}`,
          message: 'Create success Room',
          type:'success'
        })
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Create Room',
          message: error,
          type:'error'
        })
      })
  }
  const createRooms = async() => {
    await dataFormRoom.value.forEach(async(room) => {
      const roomCreate = ({
        ...room,
        description: `<div class="ChildRoomsList-room-featurebucket ChildRoomsList-room-featurebucket-Benefits">${room.description}</div>`
      })
      await createRoom(roomCreate)
    })
    handleRoute({ name: 'hotelsPartner' })
  }
  return {
    hotels,
    step,
    formHotel,
    idHotel,
    loadingHotels,
    dialogUpdate,
    imgListUpdate,
    dialogEditRoom,
    dataFormRoom,
    getHotels,
    deactivateHotel,
    activateHotel,
    createHotel,
    updateHotel,
    createRooms,
    getHotelById,
    addNewRoom,
    removeRoom
  }
}
export const usePartnerHotels = createSharedComposable(createPartnerHotels)