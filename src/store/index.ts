import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth'

export const useStore = defineStore('main', () => {
  const authStore = useAuthStore()
  return authStore
})
