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
import { FormRules, FormInstance } from 'element-plus'

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
    checkListImage,
    checkDeparture,
    checkBed,
    checkSquare,
    checkAdult,
    checkChildren
  } = validations()
  const { feedBack } = useFeedBack()
  const hotels = ref()
  const loadingHotels = ref<boolean>(false)
  const dialogUpdate = ref<boolean>(false)
  const dialogRoom = ref<boolean>(false)
  const imgListUpdate = ref<any[]>([])
  const imgListUpdateRoom = ref<any[]>([])
  const idHotel = ref<string>('')
  const idRoomUpdate = ref<string>('')
  const filterHotel = ref<any>({
    name: ''
  })
  const step = ref<number>(1)
  const openFistRoom = ref<number>(0)
  const formRefHotel = ref()
  const formRefRoom = ref()
  const dialogRoomRef = ref()
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
  const formDataRoom = ref<ICreateRoom>({
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
  const rulesRoom = reactive<FormRules>({
    name: [{ validator: checkName }],
    roomImages: [{ validator: checkListImage }],
    quantity: [{ validator: checkQuantity }],
    beds: [{ validator: checkBed }],
    adults: [{ validator: checkAdult }],
    children: [{ validator: checkChildren }],
    square: [{ validator: checkSquare }],
    price: [{ validator: checkCash }],
    description: [{ validator: checkLength }]
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
  const createHotel = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid: any) => {
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
    })
  }
  const updateHotel = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid: any) => {
      if (valid) {
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
            dialogUpdate.value = false
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
  const createRoomForDialog = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid: any) => {
      if (valid) {
        const roomCreate = ({
          ...formDataRoom.value,
          square: `${formDataRoom.value.square} m2`,
          description: `<div class="ChildRoomsList-room-featurebucket ChildRoomsList-room-featurebucket-Benefits">${formDataRoom.value.description}</div>`
        })
        await createRoom(roomCreate).then(() => {
          dialogRoom.value = false
          hotels.value = undefined
          resetFormRoom(formEl)
          getHotels()
        })
      }
    })
  }
  const createRooms = async(formEl: FormInstance[] | undefined) => {
    if (!formEl) return
    const validArr: boolean[] = []
    await Promise.all(formEl.map(async(item) => {
      return await item.validate((valid: boolean) => validArr.push(valid))
    }))
    const check = validArr.some(valid => valid !== true)
    if (!check) {
      await Promise.all(
        dataFormRooms.value.map(async(room) => {
          const roomCreate = ({
            ...room,
            square: `${room.square} m2`,
            description: `<div class="ChildRoomsList-room-featurebucket ChildRoomsList-room-featurebucket-Benefits">${room.description}</div>`
          })
          await createRoom(roomCreate)
        })
      ).then(() => {
        handleRoute({ name: 'hotelsPartner' })
      })
    }
  }
  const updateRoom = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid: any) => {
      if (valid) {
        startLoading()
        formDataRoom.value.roomImages.push(...imgListUpdateRoom.value)
        const roomCreate = await({
          ...formDataRoom.value,
          square: `${formDataRoom.value.square} m2`,
          description: `<div class="ChildRoomsList-room-featurebucket ChildRoomsList-room-featurebucket-Benefits">${formDataRoom.value.description}</div>`
        })
        const formData = await convertObjectToFormData(roomCreate, 'roomImages')
        partnerHotelStore.updateRoom(idRoomUpdate.value, formData)
          .then(() => {
            dialogRoom.value = false
            resetFormRoom(formEl)
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
    })
  }
  const deleteRoom = async(id: string) => {
    startLoading()
    partnerHotelStore.deleteRoom(id)
      .then(() => {
        finishLoading()
        hotels.value = undefined
        feedBack({
          title: 'Delete Room',
          message: 'Delete success Room',
          type:'success'
        })
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Delete Room',
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
        formDataRoom.value = {
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
    formDataRoom.value.roomImages = formDataRoom.value.roomImages?.filter(item => item !== image)
  }
  const resetFormRoom = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    idRoomUpdate.value = ''
    formDataRoom.value.roomImages = []
  }
  return {
    hotels,
    step,
    formHotel,
    idHotel,
    loadingHotels,
    dialogUpdate,
    imgListUpdate,
    dialogRoom,
    dataFormRooms,
    formDataRoom,
    filterHotel,
    openFistRoom,
    rulesHotel,
    formRefHotel,
    dialogRoomRef,
    formRefRoom,
    imgListUpdateRoom,
    rulesRoom,
    idRoomUpdate,
    createRoomForDialog,
    handleRemoveImgHotel,
    handleRemoveImgRoom,
    updateRoom,
    deleteRoom,
    getHotels,
    deactivateHotel,
    activateHotel,
    createHotel,
    updateHotel,
    createRooms,
    getHotelById,
    addNewRoom,
    removeRoom,
    getRoomById,
    resetFormRoom
  }
}
export const usePartnerHotels = createSharedComposable(createPartnerHotels)