import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'
import { ITour } from '@/libs/types/tourType'
import { ICityText } from '@/libs/types/commonType'

const createTour = () => {
  const tourStore = useTourStore()
  const tours = ref<ITour[]>()
  const popularTours = ref<ITour[]>([])
  const allCities = ref<ICityText[]>([])

  const getPopularTours = () => {
    tourStore.getPopularTours()
      .then(data => popularTours.value = data.results)
  }
  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))
  const getAllCities = () => {
    tourStore.getAllCity().then(data => allCities.value = data)
  }

  const getTourByFilterPanel = () => {
    tourStore.getToursByFilter()
  }
  return {
    popularTours,
    allCities,
    getTraffic,
    getPopularTours,
    getAllCities
  }
}
export const useTourUtil = createSharedComposable(createTour)