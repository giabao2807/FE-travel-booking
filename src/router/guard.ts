import { useDefaultLayout } from '@/composables/useDefalutLayout'
import { NavigationGuard } from 'vue-router'
import { HEADER_TAB } from '@/resources/mockData'

const requireAuth: NavigationGuard = (to, from, next) => {
  const session = sessionStorage.getItem('userData')
  const sessionUser = session ? JSON.parse(session) : ''
  const isSignIn = !!sessionUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const allowedRoles = (to.meta as { allowedRoles?: string[] }).allowedRoles

  if (requiresAuth && !isSignIn) {
    next('/sign_in')
  } else if (requiresAuth && allowedRoles?.indexOf(sessionUser?.role) === -1) {
    next('/')
  } else {
    next()
  }

  const { slideValue } = useDefaultLayout()
  slideValue.value = HEADER_TAB.find(item => item.name.toLowerCase() === to.name)?.value
}

export default requireAuth
