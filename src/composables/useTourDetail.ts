import { ref, computed, onMounted } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { TRAFFICS } from '@/resources/mockData'
import { IDetailTour, ITour } from '@/libs/types/tourType'
import { useRoute } from 'vue-router'

const createTourDetail = () => {
  const tourStore = useTourStore()
  const route = useRoute()
  const tourId = computed(() => route.params.id as string)
  const anotherTours = ref<ITour[]>([])
  const tourInfo = ref<IDetailTour>()
  const dialogBooking = ref<boolean>(false)
  const loadingAnotherTours = ref<boolean>(false)
  const bookingTour = ref<any>({
    bookingItems: [
      {
        tourId: tourId.value,
        quantity: 1
      }
    ],
    startDate: '',
    type: 2,
    bankCode: ''
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
  const handldeBookingTours = (data: any) => {
    return tourStore.bookingTour(data)
      .then(data => data)
  }
  onMounted(async() => {
    await getTourById(tourId.value)
  })
  return {
    tourInfo,
    bookingTour,
    anotherTours,
    dialogBooking,
    handldeBookingTours,
    hanldeAmount,
    getTraffic,
    getTourById,
    getAnotherToursByCity
  }
}
export const useTourDetail = createSharedComposable(createTourDetail)