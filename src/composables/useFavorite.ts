/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useUserStore } from '@/store/user'

const createFavorite = () => {
  const userStore = useUserStore()
  const historyFavoriteTours = ref<any>([])
  const historyFavoriteHotels = ref<any>([])
  const pageTour = ref<number>()
  const pageHotel = ref<number>()
  const loadingTours = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const getHistoryFavoriteTours = async(page?: number) => {
    loadingTours.value = true
    await userStore.getFavorite({ type: 2, page: page })
      .then(data => {
        historyFavoriteTours.value = data
        loadingTours.value = false
      }).catch(error => {
        loadingTours.value = false
      })
  }
  const getHistoryFavoriteHotels = async(page?: number) => {
    loadingHotels.value = true
    await userStore.getFavorite({ type: 1, page: page })
      .then(data => {
        historyFavoriteHotels.value = data
        loadingHotels.value = false
      }).catch(error => {
        loadingHotels.value = false
      })
  }
  return {
    pageTour,
    pageHotel,
    loadingTours,
    loadingHotels,
    historyFavoriteTours,
    historyFavoriteHotels,
    getHistoryFavoriteTours,
    getHistoryFavoriteHotels
  }
}
export const useFavorite = createSharedComposable(createFavorite)