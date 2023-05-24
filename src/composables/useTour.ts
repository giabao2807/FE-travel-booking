import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'
import { IResponseTour, ITour } from '@/libs/types/tourType'
import { IFilterPanel } from '@/libs/types/commonType'

const createTour = () => {
  const tourStore = useTourStore()
  const { tours, initFilterTour } = storeToRefs(tourStore)
  const popularTours = ref<ITour[]>([])
  const pageTours = ref<number>(1)
  const loadingTours = ref<boolean>(false)

  const getPopularTours = () => {
    tourStore.getPopularTours()
      .then((data: IResponseTour) => popularTours.value = data.results)
  }
  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))
  const getToursByFilterPanel = (params?: IFilterPanel) => {
    loadingTours.value = true
    tourStore.getToursByFilter(params)
      .then((data: IResponseTour) => {
        tours.value = data
        loadingTours.value = false
      })
  }

  return {
    tours,
    popularTours,
    pageTours,
    loadingTours,
    initFilterTour,
    getTraffic,
    getPopularTours,
    getToursByFilterPanel
  }
}
export const useTourUtil = createSharedComposable(createTour)