
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
  city: string
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
  const popularTours = ref<ITour[]>([])
  const tour = ref<IDetailTour>()

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
    }).then(data => tour.value = data)
  }
  return {
    popularTours,
    tour,
    getPopularTours,
    getTourById
  }
})
