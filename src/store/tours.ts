import { ref } from 'vue'
import { IResponseTour } from '@/libs/types/tourType'
import { IFilterPanel, IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { IParamReview } from '@/libs/types/hotelType'

export const useTourStore = defineStore('tourStore', () => {
  const tours = ref<IResponseTour>()
  const initParamTour: IParamPage = ({
    pageSize: 6,
    page: 1
  })
  const initFilterTour = ref<IFilterPanel>({
    pageSize: 12,
    page: 1,
    cityId: undefined,
    startDate: '',
    endDate: ''
  })
  const getTours = async(params: IParamPage = initParamTour) =>{
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour',
      params: params,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getPopularTours = async(params: IParamPage = initParamTour) =>{
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour',
      params: params,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getTourById = async(id: string) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `tour/${id}`,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getAllCity = async() => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'general/city',
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getToursByFilter = async(params?: IFilterPanel) => {
    initFilterTour.value = Object.assign(initFilterTour.value, params)
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour/filter_by_date_city',
      params: initFilterTour.value,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const getQuantityByDate = async(params: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `tour/${params?.id}/get_available_group_size`,
      params: { startDate: params?.startDate },
      headers: { 'Content-Type': 'application/json' }
    })
  }
  const getReviewsTour = async(param: Partial<IParamReview>) => {
    return await connectionsAPI({
      methods: 'GET',
      path: `tour/${param.id}/get_reviews`,
      headers: { 'Content-Type': 'application/json' },
      params: { page: param.page, pageSize: param.pageSize }
    })
  }
  return {
    tours,
    initFilterTour,
    getPopularTours,
    getTourById,
    getTours,
    getAllCity,
    getToursByFilter,
    getQuantityByDate,
    getReviewsTour
  }
})
