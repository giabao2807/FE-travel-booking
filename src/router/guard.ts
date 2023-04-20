import { NavigationGuard } from 'vue-router'

const requireAuth: NavigationGuard = (to, from, next) => {
  const session = sessionStorage.getItem('userData')
  const sessionUser = session ? JSON.parse(session) : ''
  console.log(to, from)

  if (to.meta.requiresAuth && !sessionUser?.accessToken) {
    // next({ name: 'signIn' })
    next('/')
  } else if (to.name !== 'dashboard' && sessionUser?.accessToken && sessionUser?.role === 'female') {
    next('/dashboard')
  } else if (to.name !== 'home' && sessionUser?.accessToken) {
    next()
  } else {
    next()
  }
}

export default requireAuth
