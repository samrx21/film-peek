import type { MovieApiResponse } from '@/types'

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: Collection | null
  budget: number
  credits: {
    cast: Cast[]
    crew: Crew[]
  }
  genres: Genre[]
  homepage: string
  images: {
    backdrops: Image[]
    logos: Image[]
    posters: Image[]
  }
  imdb_id: string
  origin_country: string[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  reviews: Review[]
  runtime: number
  similar: MovieApiResponse
  'watch/providers': {
    results: Record<string, WatchProvider>
  }
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  videos: {
    results: Video[]
  }
}

type Video = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

type Image = {
  aspect_ratio: number
  height: number
  iso_639_1: null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

type Cast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

type Crew = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

type ProductionCompany = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type Genre = {
  id: number
  name: string
}

export type Review = {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export type WatchProvider = {
  link: string
  rent: WatchProviderDescription[]
  buy: WatchProviderDescription[]
  flatrate: WatchProviderDescription[]
}

export type WatchProviderDescription = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

type Collection = {
  backdrop_path: '/hBQOWY8qWXJVFAc8yLTh1teIu43.jpg'
  id: 448150
  name: 'Deadpool - Colección'
  poster_path: '/6dVSBlh9blLX96tyRDsYtNKpswv.jpg'
}

export type MovieCollection = {
  id: number
  type: string
  name: string
  movies: Movie[]
}
