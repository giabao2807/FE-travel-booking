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
  const tours = ref<ITour[]>()
  const tourInfo = ref<IDetailTour>()
  const bookingTour = ref<any>({
    amount: 1
  })
  const getTourById = (id: string) => {
    tourStore.getTourById(id)
      .then(data => tourInfo.value = data)
  }
  const hanldeAmount = (increase = false) => {
    increase ? bookingTour.value.amount++ : bookingTour.value.amount--
  }
  const getTraffic = (traffics?: string[]) => TRAFFICS.filter(item => traffics?.includes(item.value))
  onMounted(async() => {
    await getTourById(tourId.value)
  })
  return {
    tourInfo,
    bookingTour,
    hanldeAmount,
    getTraffic,
    getTourById
  }
}
export const useTourDetail = createSharedComposable(createTourDetail)