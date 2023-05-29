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
  const getCityByName = (name: string) => {
    return allCities?.value.find(city => city.name.toLowerCase() === name.toLowerCase())
  }
  onMounted(() => {
    getAllCities()
  })
  return {
    allCities,
    getAllCities,
    getCityById,
    getCityByName
  }
}
export const useCities = createSharedComposable(createCities)