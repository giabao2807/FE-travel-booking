/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { usePartnerToursStore } from '@/store/partners/tours'
import { IParamPage } from '@/libs/types/commonType'
import type { FormRules, FormInstance } from 'element-plus'
import { validations } from '@/helpers/validate'
import { useTourStore } from '@/store/tours'
import { useFeedBack } from '../useFeedBack'
import { convertionType } from '@/helpers/convertion'
import { useLoading } from '@/composables/useLoading'
import { handleRoute } from '@/helpers/loadingRoute'
import { useCities } from '../useCities'

type IFormCreateTour = {
  name: string,
  coverPicture?: any,
  totalDay: number,
  totalNight: number,
  totalDays: string,
  descriptions: string,
  groupSize: number,
  price: number,
  scheduleContent: string,
  note: string,
  city: string,
  departure: string,
  traffics: string[],
  tourImages?: any[]
}
const createPartnerTours = () => {
  const partnerTourStore = usePartnerToursStore()
  const tourStore = useTourStore()
  const { getCityByName } = useCities()
  const { deCode, convertObjectToFormData } = convertionType()
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
  const imgListUpdate = ref<any[]>([])
  const formRef = ref()
  const formTour = ref<IFormCreateTour>({
    name: '',
    totalDay: 0,
    totalNight: 0,
    totalDays: '',
    descriptions: '',
    groupSize: 0,
    price: 0,
    scheduleContent: '',
    note: '',
    city: '',
    departure: '',
    traffics: [],
    tourImages: []
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

  const createTour = async(formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid) => {
      if (valid) {
        startLoading()
        const dataUpdate = await({
          ...formTour.value,
          descriptions : `<div class="single-box-excerpt">${formTour.value.descriptions}</div>`,
          scheduleContent:  `<div class="panel-body content-tour-item content-tour-tab-program-tour-0">${formTour.value.scheduleContent}</div>`,
          note: `<div class="panel-body content-tour-item content-tour-tab-tour-rule-2">${formTour.value.note}</div>`,
          totalDays: `${formTour.value.totalDay} ngày ${formTour.value.totalNight} đêm`
        })
        const formData = await convertObjectToFormData(dataUpdate, 'tourImages')
        partnerTourStore.createTour(formData)
          .then(() => {
            handleRoute({ name: 'toursPartner' })
            finishLoading()
            feedBack({
              title: 'Create Tour',
              message: 'Create success tour',
              type:'success'
            })
          }).catch(error => {
            finishLoading()
            feedBack({
              title: 'Create Tour',
              message: error,
              type:'error'
            })
          })
      }
    })
  }
  const updateTour = async(id: string, formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async(valid) => {
      if (valid) {
        startLoading()
        formTour.value.tourImages?.push(...imgListUpdate.value)
        const dataUpdate = await ({
          ...formTour.value,
          descriptions: `<div class="single-box-excerpt">${formTour.value.descriptions}</div>`,
          scheduleContent:  `<div class="panel-body content-tour-item content-tour-tab-program-tour-0">${formTour.value.scheduleContent}</div>`,
          note: '<div class="panel-body content-tour-item content-tour-tab-tour-rule-2">' + formTour.value.note + '</div>',
          totalDays: `${formTour.value.totalDay} ngày ${formTour.value.totalNight} đêm`
        })
        const formData = await convertObjectToFormData(dataUpdate, 'tourImages')
        partnerTourStore.updateTour(id, formData)
          .then(() => {
            handleRoute({ name: 'toursPartner' })
            finishLoading()
            feedBack({
              title: 'Update Tour',
              message: 'Update success tour',
              type:'success'
            })
          }).catch(error => {
            finishLoading()
            feedBack({
              title: 'Update Tour',
              message: error,
              type:'error'
            })
          })
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const handleRemove = (image: string) => {
    formTour.value.tourImages = formTour.value.tourImages?.filter(item => item !== image)
  }
  const getTourById = (id: string) => {
    startLoading()
    tourStore.getTourById(id)
      .then(data => {
        const getNumber = data?.totalDays.match(/\d+/g) || [0, 0]
        formTour.value = {
          ...data,
          tourImages: data.listImages,
          traffics: data.traffics?.split(','),
          city: getCityByName(data.city)?.id,
          totalDay: parseInt(getNumber[0]),
          totalNight: parseInt(getNumber[1]),
          descriptions: `${deCode(data.descriptions)}`,
          scheduleContent: `${deCode(data.scheduleContent)}`,
          note: `${deCode(data.note)}`
        }
        finishLoading()
      }).catch(error => {
        feedBack({
          title: 'Get Tour Detail',
          message: error,
          type:'error'
        })
        finishLoading()
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
    imgListUpdate,
    resetForm,
    getTours,
    getTourById,
    deactivateTour,
    activateTour,
    handleRemove,
    createTour,
    updateTour
  }
}
export const usePartnerTours = createSharedComposable(createPartnerTours)