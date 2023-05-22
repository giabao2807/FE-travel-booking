
import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'


export const useTourStore = defineStore('tourStore', () => {
  const initParamTour: IParamPage = ({
    pageSize: 6,
    page: 1
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

  const getToursByFilter = async(params: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'tour/filter_by_date',
      params: params,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  return {
    getPopularTours,
    getTourById,
    getTours,
    getAllCity,
    getToursByFilter
  }
})
