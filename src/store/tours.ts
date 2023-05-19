
import { IParamPage } from '@/libs/types/commonType'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ICity = {
  id: number,
  name?: string
}
export type ITour = {
  id: string,
  name: string,
  descriptions: string,
  coverPicture: string,
  totalDays: string,
  languageTour: string,
  price: number,
  rate: number,
  numReview: number,
  city: number,
  departure: string,
  traffics: string[]
}

export type IDetailTour = ITour & {
  createdAt: string,
  updatedAt: string,
  isActive: boolean,
  groupSize: number,
  scheduleContent: string,
  note: string,
  owner: string,
  listImages: string[]
}

export const useTourStore = defineStore('tourStore', () => {
  const initParamTour: IParamPage = ({
    pageSize: 6,
    page: 1
  })
  const tours = ref<ITour[]>()
  const popularTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()

  const getTours = async(params: IParamPage = initParamTour) =>{
    await connectionsAPI({
      methods: 'GET',
      path: 'tour',
      params: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(data => tours.value = data.results)
  }

  const getPopularTours = async(params: IParamPage = initParamTour) =>{
    await connectionsAPI({
      methods: 'GET',
      path: 'tour',
      params: params,
      headers: { 'Content-Type': 'application/json' }
    }).then(data => popularTours.value = data.results)
  }

  const getTourById = async(id: string) => {
    await connectionsAPI({
      methods: 'GET',
      path: `tour/${id}`,
      headers: { 'Content-Type': 'application/json' }
    }).then(data => tourInfo.value = data)
  }

  return {
    tours,
    popularTours,
    tourInfo,
    getPopularTours,
    getTourById,
    getTours
  }
})
