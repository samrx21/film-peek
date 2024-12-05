import axios from 'axios'
import type { AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import type { OptionsApi, MovieApiResponse } from '@/types'
import { useToast } from 'primevue/usetoast'

const apiKey = import.meta.env.TMDB_TOKEN as string

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
  const toast = useToast()
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
        toast.add({ severity: 'error', summary: 'Error Code' + axiosError.code, detail: axiosError.message, life: 3000 })
        break
      case 404:
        toast.add({ severity: 'error', summary: 'Error Code' + axiosError.code, detail: axiosError.message, life: 3000 })
        break
      case 429:
        toast.add({ severity: 'error', summary: 'Error Code' + axiosError.code, detail: axiosError.message, life: 3000 })
        break
      default:
        toast.add({ severity: 'error', summary: 'Error en la petición a TMDB', detail: 'Algo salio mal', life: 3000 })
        console.error('Error en la petición a TMDB')
    }
  } else {
    toast.add({ severity: 'error', summary: 'Error inesperado', detail: error, life: 3000 })
  }
}
