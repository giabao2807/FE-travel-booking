/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue'
import connectionsAPI from '@/plugins/axios'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref<any>({
    id: '',
    email: '',
    avatar: '',
    lastName: '',
    firstName: '',
    gender: 2,
    birthday: '',
    address: '',
    phone: ''
  })
  const getUserInfo = async() => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'user/info'
    })
  }
  const getUsers = async(params?: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'user',
      params: params
    })
  }
  const updateUserInfo = async(id: string, data: any) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `user/${id}`,
      data: data
    })
  }
  const createUser = async(data: any) => {
    return await connectionsAPI({
      methods: 'POST',
      path: 'user',
      data: data
    })
  }
  const deactivateUser = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `user/${id}/deactivate`
    })
  }
  const activateUser = async(id: string) => {
    return await connectionsAPI({
      methods: 'PUT',
      path: `user/${id}/activate`
    })
  }
  const getFavorite = async(params: any) => {
    return await connectionsAPI({
      methods: 'GET',
      path: 'booking/favorite',
      params: params
    })
  }
  const changePassword = async(data: any) => {
    return await connectionsAPI({
      methods: 'PATCH',
      path: 'user/change_password',
      data: data
    })
  }
  return {
    userInfo,
    getUserInfo,
    updateUserInfo,
    getUsers,
    createUser,
    activateUser,
    deactivateUser,
    getFavorite,
    changePassword
  }
})
