import type { Movie } from '@/types/'

export interface ListDetails {
  created_by: string
  description: string
  favorite_count: number
  id: string
  items: Movie[]
  item_count: number
  iso_639_1: string
  name: string
  poster_path: string
  total_pages: 4
  total_results: 69
}

export interface ListPreview {
  description: string
  favorite_count: number
  id: number
  item_count: number
  iso_639_1: string
  list_type: string
  name: string
  poster_path: string | null
}
