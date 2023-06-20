import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useHotelStore } from '@/store/hotels'
import { createSharedComposable } from '@vueuse/core'
import { convertionType } from '@/helpers/convertion'
import { IHotel, IParamHotel, IResponseHotel } from '@/libs/types/hotelType'
import { ICity, IFilterPanel, IForm } from '@/libs/types/commonType'
import { useRoute } from 'vue-router'
import { useFeedBack } from './useFeedBack'

const createHotel = () => {
  const hotelStore = useHotelStore()
  const { hotels } = storeToRefs(hotelStore)
  const route = useRoute()
  const popularHotels = ref<IHotel[]>([])
  const hotelsForUser = ref<IHotel[]>([])
  const recomendCities = ref<ICity[]>([])
  const { deCodeHtml } = convertionType()
  const { feedBack } = useFeedBack()
  const selectedCity = ref<number>(0)
  const loadingPanelHotel = ref<boolean>(false)
  const loadingHotels = ref<boolean>(false)
  const pageHotel = ref<number>(1)
  const formSearchRef = ref<IForm>()
  const priceRangeFilter = ref<number[]>([])
  const queryData = route.query as IFilterPanel
  const titlePage = ref<IFilterPanel>({
    ...queryData,
    cityId: +(queryData?.cityId || '') || undefined
  })
  const filtersHotels = ref<IFilterPanel>({
    ...queryData,
    cityId: +(queryData?.cityId || '') || undefined
  })
  const getRecomendCities = async() => {
    await hotelStore.getRecomendCities()
      .then((data: ICity[]) => {
        recomendCities.value = data
      })
    recomendCities.value[0]?.id ? selectedCity.value = recomendCities.value[0].id : ''
  }
  const getRecomendHotelByCity = (id: Partial<number>) => {
    const param:IParamHotel = {
      cityId: id,
      page: 1,
      pageSize: 8
    }
    loadingPanelHotel.value = true
    hotelStore.getHotelByCity(param)
      .then((data: IResponseHotel) => {
        popularHotels.value = data.results
        loadingPanelHotel.value = false
      })
  }

  const getHotelsByFilterPanel = (params?: IFilterPanel) => {
    loadingHotels.value = true
    filtersHotels.value = {
      ...params,
      priceRange: priceRangeFilter.value.length !== 0 ? `${priceRangeFilter.value[0]}-${priceRangeFilter.value[1]}  ` : ''
    }
    hotelStore.getHotelsByFilter(filtersHotels.value)
      .then(data => {
        hotels.value = data
        loadingHotels.value = false
      })
  }
  const getHotelsForUser = () => {
    hotelStore.getHotelsForUser(6)
      .then(data=> hotelsForUser.value = data.results)
  }
  const resetSearch = () => {
    const ref = formSearchRef.value
    ref?.reset()
    getHotelsByFilterPanel()
  }
  const addFavoriteHotel = async(id: string) => {
    await hotelStore.addFavoriteHotel(id)
      .then(() => {
        feedBack({
          title: 'Add Favorite Hotel',
          message: 'Add hotel favorite success',
          type:'success'
        })
      }).catch(error => {
        feedBack({
          title: 'Add Favorite Hotel',
          message: error?.data,
          type:'success'
        })
      })
  }
  const removeFavoriteHotel = async(id: string) => {
    await hotelStore.removeFavoriteHotel(id)
      .then(() => {
        feedBack({
          title: 'Remove Favorite Hotel',
          message: 'Remove hotel favorite success',
          type:'success'
        })
      }).catch(error => {
        feedBack({
          title: 'Remove Favorite Hotel',
          message: error?.data,
          type:'error'
        })
      })
  }
  return {
    hotels,
    popularHotels,
    hotelsForUser,
    filtersHotels,
    recomendCities,
    selectedCity,
    loadingPanelHotel,
    loadingHotels,
    pageHotel,
    titlePage,
    priceRangeFilter,
    resetSearch,
    deCodeHtml,
    getRecomendHotelByCity,
    getRecomendCities,
    getHotelsByFilterPanel,
    getHotelsForUser,
    addFavoriteHotel,
    removeFavoriteHotel
  }
}
export const useHotelUtil = createSharedComposable(createHotel)