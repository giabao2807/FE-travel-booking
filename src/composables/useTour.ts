import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from './useLoading'
import { useTourStore } from '@/store/tours'

const createTour = () => {
  const tourStore = useTourStore()
  const { popularTours, tour } = storeToRefs(tourStore)
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

  return {
    popularTours,
    tour,
    getPopularTours,
    getTourById
  }
}
export const useTourUtil = createSharedComposable(createTour)