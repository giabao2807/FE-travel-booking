import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'
import { IResponseTour, ITour } from '@/libs/types/tourType'
import { ICityText, IFilterPanel } from '@/libs/types/commonType'

const createTour = () => {
  const tourStore = useTourStore()
  const { tours } = storeToRefs(tourStore)
  const popularTours = ref<ITour[]>([])
  const allCities = ref<ICityText[]>([])
  const pageTours = ref<number>(1)


  const getPopularTours = () => {
    tourStore.getPopularTours()
      .then((data: IResponseTour) => popularTours.value = data.results)
  }
  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))
  const getAllCities = () => {
    tourStore.getAllCity().then((data: ICityText[]) => allCities.value = data)
  }

  const getToursByFilterPanel = (params: Partial<IFilterPanel>) => {
    tourStore.getToursByFilter(params).then((data: IResponseTour) => tours.value = data)
  }
  return {
    tours,
    popularTours,
    allCities,
    pageTours,
    getTraffic,
    getPopularTours,
    getAllCities,
    getToursByFilterPanel
  }
}
export const useTourUtil = createSharedComposable(createTour)