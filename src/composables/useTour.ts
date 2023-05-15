import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from './useLoading'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'

const createTour = () => {
  const tourStore = useTourStore()
  const { popularTours, tourInfo } = storeToRefs(tourStore)
  const { startLoading, finishLoading } = useLoading()
  const getPopularTours = async() => {
    startLoading()
    await tourStore.getPopularTours()
    finishLoading()
  }

  const getTourById = async(id: string) => {
    startLoading()
    await tourStore.getTourById(id)
    finishLoading()
  }

  const getTraffic = (traffics: string[]) => TRAFFICS.filter(item => traffics.includes(item.value))

  return {
    popularTours,
    tourInfo,
    getTraffic,
    getPopularTours,
    getTourById
  }
}
export const useTourUtil = createSharedComposable(createTour)