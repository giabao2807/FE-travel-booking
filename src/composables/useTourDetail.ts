import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useCities } from './useCities'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { IDetailTour, ITour } from '@/libs/types/tourType'
import { useRoute } from 'vue-router'
import { useBookingDialog } from '@/composables/useBookingDialog'
const createTourDetail = () => {
  const tourStore = useTourStore()
  const { initFilterTour } = storeToRefs(tourStore)
  const route = useRoute()
  const tourId = computed(() => route.params.id as string)
  const anotherTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()
  const dialogBooking = ref<boolean>(false)
  const loadingAnotherTours = ref<boolean>(false)
  const quantityByStartDate = ref<number>(1)
  const { bookTour } = useBookingDialog()
  const { getCityByName } = useCities()

  const getQuantityByStartDate = (event: any) => {
    const response = event ? tourStore.getQuantityByDate({ id: tourId.value, startDate: event }) : null
    response?.then(data => quantityByStartDate.value = data?.availableGroupSize)
  }

  const getAnotherToursByCity = async(id: string, city?: string) => {
    loadingAnotherTours.value = true
    await tourStore.getToursByFilter({ cityId:  getCityByName(city || '')?.id })
      .then(data => {
        anotherTours.value = data.results.filter((item: ITour) => item.id !== id)
      })
    loadingAnotherTours.value = false
  }
  const getTourById = async(id: string) => {
    await tourStore.getTourById(id)
      .then(data => {
        tourInfo.value = data
      })
    getAnotherToursByCity(tourId.value, tourInfo.value?.city)
  }
  return {
    tourInfo,
    bookTour,
    anotherTours,
    dialogBooking,
    tourId,
    quantityByStartDate,
    initFilterTour,
    getQuantityByStartDate,
    getTourById,
    getAnotherToursByCity
  }
}
export const useTourDetail = createSharedComposable(createTourDetail)