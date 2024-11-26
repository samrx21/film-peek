import { tmdb, handleApiError } from '@/services/tmdbService'
import type { OptionsApi, MovieReviewApiResponse, MovieDetails } from '@/types'
import { getMoviesFromTMDB } from '@/services/tmdbService'
export async function getPopularMovies() {
  const options: OptionsApi = {
    method: 'GET',
    url: '/movie/popular',
    params: { language: 'es-ES', page: '1' }
  }
  return await getMoviesFromTMDB(options)
}

export async function getTopRatedMovies() {
  const options: OptionsApi = {
    method: 'GET',
    url: '/movie/top_rated',
    params: { language: 'es-ES', page: '1' }
  }
  return await getMoviesFromTMDB(options)
}

export async function getMoviesByGenre(genreId: number) {
  const options: OptionsApi = {
    method: 'GET',
    url: '/discover/movie',
    params: {
      language: 'es-ES',
      page: '1',
      with_genres: genreId.toString(),
      sort_by: 'popularity.desc'
    }
  }
  return await getMoviesFromTMDB(options)
}

export async function getMovieDetails(id: string) {
  const options: OptionsApi = {
    method: 'GET',
    url: `/movie/${id}`,
    params: { language: 'es-ES', include_image_language: 'es,null', append_to_response: 'videos,images,similar,watch/providers,credits' }
  }

  try {
    const response = await tmdb.request(options)
    const data = response.data as MovieDetails
    response.data.reviews = await getReviews(id, 1)
    return data
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export async function getReviews(id: string, page: number) {
  const options: OptionsApi = {
    method: 'GET',
    url: `/movie/${id}/reviews`,
    params: { page: page }
  }
  try {
    const response = await tmdb.request(options)
    const data = response.data as MovieReviewApiResponse
    return data.results
  } catch (error) {
    handleApiError(error)
    return []
  }
}
