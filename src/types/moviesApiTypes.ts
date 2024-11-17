import type { AxiosRequestConfig } from 'axios'
import type { Movie, Review } from '@/types'

export interface OptionsApi extends AxiosRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  params?: {}
}

export type ApiResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type MovieApiResponse = ApiResponse<Movie>
export type MovieReviewApiResponse = ApiResponse<Review> & { id: number }
