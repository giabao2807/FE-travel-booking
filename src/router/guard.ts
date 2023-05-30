import { NavigationGuard } from 'vue-router'

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
}

export default requireAuth
