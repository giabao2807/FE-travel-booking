import { ref, computed, onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'
import { IDetailTour, ITour } from '@/libs/types/tourType'
import { useRoute } from 'vue-router'
import { useCities } from './useCities'

const createTourDetail = () => {
  const tourStore = useTourStore()
  const route = useRoute()
  const { getCityById } = useCities()
  const tourId = computed(() => route.params.id as string)
  const anotherTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()

  const loadingAnotherTours = ref<boolean>(false)
  const bookingTour = ref<any>({
    amount: 1
  })
  const hanldeAmount = (increase = false) => {
    increase ? bookingTour.value.amount++ : bookingTour.value.amount--
  }
  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))
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
      .then(data => tourInfo.value = data)
    getAnotherToursByCity(id)
  }
  onMounted(async() => {
    await getTourById(tourId.value)
  })
  return {
    tourInfo,
    bookingTour,
    anotherTours,
    hanldeAmount,
    getTraffic,
    getTourById,
    getAnotherToursByCity
  }
}
export const useTourDetail = createSharedComposable(createTourDetail)