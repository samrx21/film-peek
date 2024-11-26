import { tmdb } from '@/services/tmdbService'

export async function getRequestToken() {
  const response = await tmdb.get('/authentication/token/new')
  return response.data.request_token
}
