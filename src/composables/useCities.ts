import { onMounted, ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useTourStore } from '@/store/tours'
import { ICityText } from '@/libs/types/commonType'

const createCities = () => {
  const tourStore = useTourStore()
  const allCities = ref<ICityText[]>([])

  const getAllCities = () => {
    tourStore.getAllCity().then((data: ICityText[]) => allCities.value = data)
  }
  const getCityById = (id: number) => {
    return allCities?.value.find(city => city.id === id)
  }
  onMounted(() => {
    getAllCities()
  })
  return {
    allCities,
    getAllCities,
    getCityById
  }
}
export const useCities = createSharedComposable(createCities)