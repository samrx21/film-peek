import { getRequestToken } from '@/services/authService'

async function redirectToTMDB() {
  const requestToken = await getRequestToken()
  // Guarda el token en localStorage para usarlo después
  localStorage.setItem('request_token', requestToken)

  // Redirige al usuario a TMDB
  const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/auth/callback`
  window.location.href = redirectUrl
}

export default redirectToTMDB
