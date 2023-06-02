import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { IResponseTour, ITour } from '@/libs/types/tourType'
import { IFilterPanel } from '@/libs/types/commonType'

const createTour = () => {
  const tourStore = useTourStore()
  const { tours, initFilterTour } = storeToRefs(tourStore)
  const popularTours = ref<ITour[]>([])
  const pageTours = ref<number>(1)
  const loadingTours = ref<boolean>(false)
  const dialogBooking = ref<boolean>(false)
  const titlePage = {
    cityId: initFilterTour.value.cityId,
    startDate: initFilterTour.value.startDate,
    endDate: initFilterTour.value.endDate
  }
  const getPopularTours = () => {
    tourStore.getPopularTours()
      .then((data: IResponseTour) => popularTours.value = data.results)
  }
  const getToursByFilterPanel = (params?: IFilterPanel) => {
    loadingTours.value = true
    tourStore.getToursByFilter(params)
      .then((data: IResponseTour) => {
        tours.value = data
        loadingTours.value = false
      })
  }
  const countDate = computed(() => {
    const ONE_DAY = 1000 * 60 * 60 * 24
    if (initFilterTour.value.startDate && initFilterTour.value.endDate) {
      const startDate = new Date(initFilterTour.value.startDate)
      const endDate = new Date(initFilterTour.value.endDate)
      const time = Math.abs(startDate.getTime() - endDate.getTime())
      return Math.round(time / ONE_DAY)
    }
    return null
  })

  return {
    tours,
    popularTours,
    pageTours,
    loadingTours,
    initFilterTour,
    countDate,
    dialogBooking,
    titlePage,
    getPopularTours,
    getToursByFilterPanel
  }
}
export const useTourUtil = createSharedComposable(createTour)