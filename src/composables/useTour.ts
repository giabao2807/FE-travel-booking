import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { IResponseTour, ITour } from '@/libs/types/tourType'
import { IFilterPanel, IForm } from '@/libs/types/commonType'
import { useRoute } from 'vue-router'

const createTour = () => {
  const tourStore = useTourStore()
  const { tours } = storeToRefs(tourStore)
  const route = useRoute()
  const popularTours = ref<ITour[]>([])
  const pageTours = ref<number>(1)
  const loadingTours = ref<boolean>(false)
  const dialogBooking = ref<boolean>(false)
  const formSearchRef = ref<IForm>()
  const queryData = route.query as IFilterPanel
  const titlePage = ref<IFilterPanel>({
    ...queryData,
    cityId: +(queryData?.cityId || '')
  })
  const filtersTours = ref<IFilterPanel>({
    ...queryData,
    cityId: +(queryData?.cityId || '') || undefined
  })

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
  const resetSearch = () => {
    const ref = formSearchRef.value
    ref?.reset()
    getToursByFilterPanel()
  }
  return {
    tours,
    popularTours,
    pageTours,
    loadingTours,
    filtersTours,
    dialogBooking,
    titlePage,
    formSearchRef,
    resetSearch,
    getPopularTours,
    getToursByFilterPanel
  }
}
export const useTourUtil = createSharedComposable(createTour)