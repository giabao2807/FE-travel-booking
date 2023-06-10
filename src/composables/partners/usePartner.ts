import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { IParamPage } from '@/libs/types/commonType'
import { usePartnerStore } from '@/store/partners'


const createPartner = () => {
  const partnerStore = usePartnerStore()
  const revenue = ref<any>({
    labels: [],
    datasets: []
  })
  const staticBox = ref<any[]>([])
  const potentailCustomers = ref<any[]>([])
  const getRevenue = async(params: any) => {
    partnerStore.getRevenue(params)
      .then(data => {
        const dataChartTour: any[] = []
        const dataChartHotel: any[] = []
        const dataLabel : any[] = []
        data?.details.forEach((item: any) => {
          dataLabel.push(item.day)
          dataChartTour.push(item.tour)
          dataChartHotel.push(item.hotel)
        })
        revenue.value.labels = dataLabel
        revenue.value.datasets = [{ data: dataChartTour }, { data: dataChartHotel }]
      })
  }
  const getStaticBox = async() => {
    partnerStore.getStaticBox()
      .then(data => staticBox.value = data)
  }
  const getPotentialCustomers = () => {
    return partnerStore.getPotentialCustomers()
      .then(data => potentailCustomers.value = data)
  }
  return {
    revenue,
    staticBox,
    potentailCustomers,
    getStaticBox,
    getPotentialCustomers,
    getRevenue
  }
}
export const usePartner = createSharedComposable(createPartner)