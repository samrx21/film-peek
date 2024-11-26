import axios from 'axios'
import type { OptionsApi, MovieApiResponse } from '@/types'

const apiKey = import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH as string

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
})

export async function getMoviesFromTMDB(options: OptionsApi) {
  try {
    const response = await tmdb.request(options)
    const data: MovieApiResponse = response.data
    return data.results
  } catch (error) {
    handleApiError(error)
    return []
  }
}

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', error.message)
    if (error.response) {
      console.error('Response data:', error.response.data)
      console.error('Response status:', error.response.status)
    }
  } else {
    console.error('Unexpected error:', error)
  }
}
