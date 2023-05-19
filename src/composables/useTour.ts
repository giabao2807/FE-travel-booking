import { storeToRefs } from 'pinia'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'

const createTour = () => {
  const tourStore = useTourStore()
  const { popularTours, tourInfo } = storeToRefs(tourStore)
  const getPopularTours = async() => {
    await tourStore.getPopularTours()
  }

  const getTourById = async(id: string) => {
    await tourStore.getTourById(id)
  }

  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))

  return {
    popularTours,
    tourInfo,
    getTraffic,
    getPopularTours,
    getTourById
  }
}
export const useTourUtil = createSharedComposable(createTour)