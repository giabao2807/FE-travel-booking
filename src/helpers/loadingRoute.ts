import { useLoading } from '@/composables/useLoading'
import router from '@/router'

export const hanldeRoute = (paramRoute: any) => {
  const { startLoading, finishLoading } = useLoading()
  startLoading()
  setTimeout(() => {
    router.push(paramRoute)
    finishLoading()
  }, 1500)
}