import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { useLoading } from './useLoading'
import { useTourStore } from '@/store/tours'

const useTour = () => {
  const tourStore = useTourStore()
  const { popularTours } = storeToRefs(tourStore)
  const { startLoading, finishLoading } = useLoading()
  const getPopularTours = async() => {
    startLoading()
    await tourStore.getPopularTours()
    finishLoading()
  }

  return {
    popularTours,
    getPopularTours
  }
}
export const useTourUtil = createSharedComposable(useTour)