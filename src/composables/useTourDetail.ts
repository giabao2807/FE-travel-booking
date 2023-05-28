import { ref, computed } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { IDetailTour, ITour } from '@/libs/types/tourType'
import { useRoute } from 'vue-router'
import { useBooking } from '@/composables/useBooking'
const createTourDetail = () => {
  const tourStore = useTourStore()
  const route = useRoute()
  const tourId = computed(() => route.params.id as string)
  const anotherTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()
  const dialogBooking = ref<boolean>(false)
  const loadingAnotherTours = ref<boolean>(false)
  const quantityByStartDate = ref<number>(1)
  const { bookTour } = useBooking()

  const getQuantityByStartDate = (event: any) => {
    const a = event ? tourStore.getQuantityByDate({ id: tourId.value, startDate: event }) : null
    console.log(a)

  }

  const getAnotherToursByCity = async(id: string) => {
    loadingAnotherTours.value = true
    await tourStore.getToursByFilter({ cityId:  14 })
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
    getAnotherToursByCity(id)
  }
  return {
    tourInfo,
    bookTour,
    anotherTours,
    dialogBooking,
    tourId,
    quantityByStartDate,
    getQuantityByStartDate,
    getTourById,
    getAnotherToursByCity
  }
}
export const useTourDetail = createSharedComposable(createTourDetail)