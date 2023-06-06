import { useLoading } from '@/composables/useLoading'
import router from '@/router'

const { startLoading, finishLoading } = useLoading()
export const handleRoute = (paramRoute: any) => {
  startLoading()
  router.push(paramRoute)
  finishLoading()
}