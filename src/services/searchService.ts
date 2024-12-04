import { getMoviesFromTMDB } from './tmdbService'
import type { OptionsApi } from '@/types'

export async function searchMovies(query: string, page: number = 1) {
  const options: OptionsApi = {
    method: 'GET',
    url: '/search/movie',
    params: { language: 'es-ES', query: query, page: page.toString() }
  }
  return await getMoviesFromTMDB(options)
}
