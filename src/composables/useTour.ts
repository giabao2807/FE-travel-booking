import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { IResponseTour, ITour } from '@/libs/types/tourType'
import { IFilterPanel, IForm } from '@/libs/types/commonType'
import { useRoute } from 'vue-router'
import { useFeedBack } from './useFeedBack'

const createTour = () => {
  const tourStore = useTourStore()
  const { tours } = storeToRefs(tourStore)
  const route = useRoute()
  const popularTours = ref<ITour[]>([])
  const pageTours = ref<number>(1)
  const loadingTours = ref<boolean>(false)
  const dialogBooking = ref<boolean>(false)
  const formSearchRef = ref<IForm>()
  const priceRangeFilter = ref<number[]>([])
  const toursForUser = ref<ITour[]>([])
  const { feedBack } = useFeedBack()
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
    tourStore.getPopularTours({ pageSize: 8 })
      .then((data: IResponseTour) => popularTours.value = data.results)
  }
  const getToursForUser = () => {
    tourStore.getToursForUser(6)
      .then(data=> toursForUser.value = data.results)
  }
  const getToursByFilterPanel = (params?: IFilterPanel) => {
    loadingTours.value = true
    filtersTours.value = {
      ...params,
      priceRange: priceRangeFilter.value.length !== 0 ? `${priceRangeFilter.value[0]}-${priceRangeFilter.value[1]}  ` : ''
    }
    tourStore.getToursByFilter(filtersTours.value)
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
  const addFavoriteTour = async(id: string) => {
    await tourStore.addFavoriteTour(id)
      .then(() => {
        feedBack({
          title: 'Add Favorite Tour',
          message: 'Add tour favorite success',
          type:'success'
        })
      }).catch(error => {
        feedBack({
          title: 'Add Favorite Tour',
          message: error?.data,
          type:'success'
        })
      })
  }
  const removeFavoriteTour = async(id: string) => {
    await tourStore.removeFavoriteTour(id)
      .then(() => {
        feedBack({
          title: 'Remove Favorite Tour',
          message: 'Remove tour favorite success',
          type:'success'
        })
      }).catch(error => {
        feedBack({
          title: 'Remove Favorite Tour',
          message: error?.data,
          type:'error'
        })
      })
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
    priceRangeFilter,
    toursForUser,
    resetSearch,
    getPopularTours,
    getToursByFilterPanel,
    getToursForUser,
    addFavoriteTour,
    removeFavoriteTour
  }
}
export const useTourUtil = createSharedComposable(createTour)