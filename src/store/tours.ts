import { ref } from 'vue'
import { IResponseTour } from '@/libs/types/tourType'
import { IFilterPanel, IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

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

  const getToursByFilter = async(params: Partial<IFilterPanel>) => {
    const object = Object.assign(initFilterTour.value, params)
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour/filter_by_date_city',
      params: object,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return {
    tours,
    getPopularTours,
    getTourById,
    getTours,
    getAllCity,
    getToursByFilter
  }
})
