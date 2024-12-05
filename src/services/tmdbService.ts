import axios from 'axios'
import type { AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import type { OptionsApi, MovieApiResponse } from '@/types'

const apiKey = import.meta.env.VITE_TMDB_TOKEN as string

export const tmdb: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
})

export async function getMoviesFromTMDB(options: OptionsApi): Promise<MovieApiResponse> {
  try {
    const response: AxiosResponse<MovieApiResponse> = await tmdb.request(options)
    return response.data
  } catch (error) {
    handleApiError(error)
    return { results: [], total_pages: 0, total_results: 0, page: 1 }
  }
}

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    console.error('Error en la petición:', {
      mensaje: axiosError.message,
      código: axiosError.code,
      estado: axiosError.response?.status,
      datos: axiosError.response?.data
    })

    // Manejar errores específicos
    switch (axiosError.response?.status) {
      case 401:
        console.error('Error 401:', axiosError.message)
        break
      case 404:
        console.error('Error 404:', axiosError.message)
        break
      case 429:
        console.error('Error 429:', axiosError.message)
        break
      default:
        console.error('Error en la petición a TMDB:', axiosError.message)
    }
  } else {
    console.error('Error inesperado:', error)
  }
}
