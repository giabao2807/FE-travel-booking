/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerHotelsStore } from '@/store/partners/hotels'
import { useHotelStore } from '@/store/hotels'
import { useFeedBack } from '../useFeedBack'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { convertionType } from '@/helpers/convertion'
import { validations } from '@/helpers/validate'
import { FormRules } from 'element-plus'

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
  const {
    checkQuantity,
    checkCash,
    checkAddress,
    checkLength,
    checkName,
    checkCoverImage,
    checkCity,
    checkDeparture
  } = validations()
  const { feedBack } = useFeedBack()
  const hotels = ref()
  const loadingHotels = ref<boolean>(false)
  const dialogUpdate = ref<boolean>(false)
  const dialogEditRoom = ref<boolean>(false)
  const imgListUpdate = ref<any[]>([])
  const imgListUpdateRoom = ref<any[]>([])
  const idHotel = ref<string>('')
  const idRoomUpdate = ref<string>('')
  const step = ref<number>(1)
  const openFistRoom = ref<number>(0)
  const formRefHotel = ref()
  const formHotel = ref<any>({
    id: '',
    coverPicture: '',
    name: '',
    address: '',
    descriptions: '',
    rules: '',
    city: undefined,
    hotelImages: []
  })
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
  const dataFormRooms = ref<ICreateRoom[]>([initDataRoom])
  const formUpdateRoom = ref<ICreateRoom>({
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
  const rulesHotel = reactive<FormRules>({
    name: [{ validator: checkName }],
    coverPicture: [{ validator: checkCoverImage }],
    city: [{ validator: checkCity }],
    departure: [{ validator: checkDeparture }],
    descriptions: [{ validator: checkLength }],
    address:[{ validator: checkAddress }],
    scheduleContent: [{ validator: checkLength }],
    rules: [{ validator: checkLength }]
  })

  const addNewRoom = () => {
    dataFormRooms.value.push({
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
    dataFormRooms.value = dataFormRooms.value.filter((item, idx) => idx !== id)
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
    const { valid } = await formRefHotel.value.validate()
    if (valid) {
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
        getHotels()
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
    await partnerHotelStore.createRoom(idHotel.value, formData)
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
    await Promise.all(
      dataFormRooms.value.map(async(room) => {
        const roomCreate = ({
          ...room,
          square: `${formUpdateRoom.value.square} m2`,
          description: `<div class="ChildRoomsList-room-featurebucket ChildRoomsList-room-featurebucket-Benefits">${room.description}</div>`
        })
        await createRoom(roomCreate)
      })
    )
    handleRoute({ name: 'hotelsPartner' })
    getHotels()
  }
  const updateRoom = async() => {
    startLoading()
    formUpdateRoom.value.roomImages.push(...imgListUpdateRoom.value)
    const roomCreate = await({
      ...formUpdateRoom.value,
      square: `${formUpdateRoom.value.square} m2`,
      description: `<div class="ChildRoomsList-room-featurebucket ChildRoomsList-room-featurebucket-Benefits">${formUpdateRoom.value.description}</div>`
    })
    const formData = await convertObjectToFormData(roomCreate, 'roomImages')
    partnerHotelStore.updateRoom(idRoomUpdate.value, formData)
      .then(() => {
        dialogEditRoom.value = false
        getHotels()
        finishLoading()
        feedBack({
          title: 'Update Room',
          message: 'Update success Room',
          type:'success'
        })
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Update Room',
          message: error,
          type:'error'
        })
      })
  }
  const getRoomById = async(id: string) => {
    startLoading()
    partnerHotelStore.getRoomById(id)
      .then(data => {
        idRoomUpdate.value = id
        formUpdateRoom.value = {
          ... data,
          square: parseInt(data.square),
          roomImages: data.listImages
        }
        finishLoading()
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Get Room',
          message: error,
          type:'error'
        })
      })
  }
  const handleRemoveImgHotel = (image: string) => {
    formHotel.value.hotelImages = formHotel.value.hotelImages?.filter((item: any) => item !== image)
  }
  const handleRemoveImgRoom = (image: string) => {
    formUpdateRoom.value.roomImages = formUpdateRoom.value.roomImages?.filter(item => item !== image)
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
    dataFormRooms,
    formUpdateRoom,
    openFistRoom,
    rulesHotel,
    formRefHotel,
    imgListUpdateRoom,
    handleRemoveImgHotel,
    handleRemoveImgRoom,
    updateRoom,
    getHotels,
    deactivateHotel,
    activateHotel,
    createHotel,
    updateHotel,
    createRooms,
    getHotelById,
    addNewRoom,
    removeRoom,
    getRoomById
  }
}
export const usePartnerHotels = createSharedComposable(createPartnerHotels)