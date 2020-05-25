import { signOutApiCall } from './api-auth'

export const authenticate = (jwt, cb) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt))
  }

  cb()
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }

  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'))
  }
  else {
    return false
  }
}

export const signout = (cb) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt')
  }

  cb()

  signOutApiCall()
  .then((data) => {
    document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  })
}
