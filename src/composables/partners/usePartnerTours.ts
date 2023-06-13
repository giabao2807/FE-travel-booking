import { reactive, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerToursStore } from '@/store/partners/tours'
import { IParamPage } from '@/libs/types/commonType'
import { UploadProps } from 'element-plus/es/components'
import type { FormRules, FormInstance } from 'element-plus'
import { validations } from '@/helpers/validate'
import { useTourStore } from '@/store/tours'
import { useFeedBack } from '../useFeedBack'
import { convertionType } from '@/helpers/convertion'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'

const createPartnerTours = () => {
  const partnerTourStore = usePartnerToursStore()
  const tourStore = useTourStore()
  const { deCode } = convertionType()
  const { startLoading, finishLoading } = useLoading()
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
    formTour.value.totalDay - value !== 1 && formTour.value.totalDay - value !== 0 ?
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


  const createTour = () => {
    startLoading()
    const testForm = new FormData()
    formTour.value = {
      ...formTour.value,
      descriptions : `<div class="single-box-excerpt">${formTour.value.descriptions}</div>`,
      scheduleContent:  `<div class="panel-body content-tour-item content-tour-tab-program-tour-0">${formTour.value.scheduleContent}</div>`,
      note: `<div class="panel-body content-tour-item content-tour-tab-tour-rule-2">${formTour.value.note}</div>`,
      totalDays: `${formTour.value.totalDay} ngày ${formTour.value.totalNight} đêm`
    }
    partnerTourStore.createTour(formTour.value)
      .then(() => {
        handleRoute({ name: 'toursPartner' })
        finishLoading()
        feedBack({
          title: 'Create Coupon',
          message: 'Create success coupon',
          type:'success'
        })
      }).catch(error => {
        finishLoading()
        feedBack({
          title: 'Create Coupon',
          message: error,
          type:'error'
        })
      })
  }
  const formRef = ref<FormInstance>()
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }
  const getTourById = (id: string) => {
    tourStore.getTourById(id)
      .then(data => {
        const getNumber = data?.totalDays.match(/\d+/g) || [0, 0]
        formTour.value = {
          ...data,
          coverPicture: undefined,
          totalDay: parseInt(getNumber[0]),
          totalNight: parseInt(getNumber[1]),
          traffics: JSON.parse(data.traffics.replace(/'/g, '"')),
          descriptions: `${deCode(data.descriptions)}`,
          scheduleContent: `${deCode(data.scheduleContent)}`,
          note: `${deCode(data.note)}`
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
    formRef,
    resetForm,
    getTours,
    getTourById,
    deactivateTour,
    activateTour,
    handleRemove,
    createTour
  }
}
export const usePartnerTours = createSharedComposable(createPartnerTours)