import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'
import { IDetailTour, ITour } from '@/libs/types/tourType'
import { ICityText } from '@/libs/types/commonType'

const createTour = () => {
  const tourStore = useTourStore()
  const tours = ref<ITour[]>()
  const popularTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()
  const allCities = ref<ICityText[]>([])
  const getPopularTours = () => {
    tourStore.getPopularTours()
      .then(data => popularTours.value = data.results)
  }

  const getTourById = (id: string) => {
    tourStore.getTourById(id)
      .then(data => tourInfo.value = data)
  }

  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))
  const getAllCities = () => {
    tourStore.getAllCity().then(data => allCities.value = data)
  }
  return {
    popularTours,
    tourInfo,
    allCities,
    getTraffic,
    getPopularTours,
    getTourById,
    getAllCities
  }
}
export const useTourUtil = createSharedComposable(createTour)