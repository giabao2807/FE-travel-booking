import { reactive, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerToursStore } from '@/store/partners/tours'
import { IParamPage } from '@/libs/types/commonType'
import type { UploadProps } from 'element-plus/es/components'
import type { FormRules } from 'element-plus'
import { validations } from '@/helpers/validate'
import { useTourStore } from '@/store/tours'
import { useFeedBack } from '../useFeedBack'


const createPartnerTours = () => {
  const partnerTourStore = usePartnerToursStore()
  const tourStore = useTourStore()
  const {
    checkQuantity,
    checkCash,
    checkLength,
    checkName,
    checkCoverImage,
    checkCity,
    checkDeparture,
    checkTraffics,
    checkDay
  } = validations()
  const { feedBack } = useFeedBack()
  const tours = ref()
  const loadingTours = ref<boolean>(false)
  const formTour = ref({
    name: '',
    coverPicture: undefined,
    totalDay: 0,
    totalNight: 0,
    totalDays: '',
    descriptions: '',
    groupSize: 0,
    price: 0,
    scheduleContent: '',
    note: '',
    city: undefined,
    departure: '',
    traffics: [],
    tourImages: undefined
  })
  const checkNight = (rule: any, value: number, callback: any) => {
    formTour.value.totalDay - value !== 1 || formTour.value.totalDay - value !== 0 ?
      callback(new Error('Đêm chọn không phù hợp.')) : callback()
  }

  const rules = reactive<FormRules>({
    name: [{ validator: checkName }],
    coverPicture: [{ validator: checkCoverImage }],
    groupSize: [{ validator: checkQuantity }],
    city: [{ validator: checkCity }],
    departure: [{ validator: checkDeparture }],
    price: [{ validator: checkCash }],
    descriptions: [{ validator: checkLength }],
    scheduleContent: [
      { validator: checkLength }
    ],
    note: [
      { validator: checkLength }
    ],
    traffics: [{ validator: checkTraffics }],
    totalDay: [{ validator: checkDay }],
    totalNight: [{ validator: checkNight }]
  })


  const createrTour = () => {
    formTour.value = {
      ...formTour.value,
      descriptions : `<div class="single-box-excerpt">${formTour.value.departure}</div>`,
      scheduleContent:  `<div class="panel-body content-tour-item content-tour-tab-program-tour-0">${formTour.value.scheduleContent}</div>`,
      note: `<div class="panel-body content-tour-item content-tour-tab-tour-rule-2">${formTour.value.note}</div>`,
      totalDays: `${formTour.value.totalDay} ngày ${formTour.value.totalNight} đêm`
    }
    console.log('submit!', formTour.value)
  }
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }
  const getTourById = (id: string) => {
    tourStore.getTourById(id)
      .then(data => {
        const getNumber = data?.totalDays.match(/\d+/g)
        formTour.value = {
          ...data,
          totalDay: parseInt(getNumber[0]),
          totalNight: parseInt(getNumber[1])
        }
      })
  }
  const getTours = (params?: IParamPage) => {
    loadingTours.value = true
    partnerTourStore.getTours(params)
      .then(data => {
        tours.value = data
        loadingTours.value = false
      })
  }
  const deactivateTour = async(id: string) => {
    await partnerTourStore.deactivateTour(id)
      .then(data => feedBack({
        title: 'Deactivate Tour',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Deactivate Tour',
        message: error,
        type:'error'
      }))
    getTours()
  }
  const activateTour = async(id: string) => {
    await partnerTourStore.activateTour(id)
      .then(data => feedBack({
        title: 'Activate Tour',
        message: data.message,
        type:'success'
      })).catch(error => feedBack({
        title: 'Activate Tour',
        message: error,
        type:'error'
      }))
    getTours()
  }
  return {
    tours,
    formTour,
    loadingTours,
    rules,
    getTours,
    getTourById,
    deactivateTour,
    activateTour,
    handleRemove,
    createrTour
  }
}
export const usePartnerTours = createSharedComposable(createPartnerTours)