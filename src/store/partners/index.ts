import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'

export const usePartnerStore = defineStore('partnerStore', () => {

  const getRevenue = async(params: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'statistic/revenue_by_date',
      params: params
    })
  }
  const getStaticBox = async() => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'statistic/box_dashboard'
    })
  }
  const getPotentialCustomers = async() => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'statistic/get_potential_customers'
    })
  }

  return {
    getRevenue,
    getStaticBox,
    getPotentialCustomers
  }
})
