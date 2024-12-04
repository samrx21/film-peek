import { getMoviesFromTMDB, tmdb } from '@/services/tmdbService'
import type { OptionsApi, ListDetails } from '@/types'
import axios from 'axios'
const apiKey = import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH as string
import { useAuthStore, useFavoriteStore, useWatchlistStore, useListsStore } from '@/stores'

export async function handleFavorite(media_type: string, media_id: number, favorite: boolean) {
  const authStore = useAuthStore()
  const options = {
    method: 'POST',
    url: 'https://api.themoviedb.org/3/account/account_id/favorite?session_id=' + authStore.sessionId,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    data: { media_type: media_type, media_id: media_id, favorite: favorite }
  }

  const response = await axios.request(options)
  console.log('response of addFavorite', response)
}

export async function getFavoritesMovies() {
  const authStore = useAuthStore()
  const favoriteStore = useFavoriteStore()
  const options: OptionsApi = {
    method: 'GET',
    url: '/account/account_id/favorite/movies?session_id=' + authStore.sessionId,
    params: { language: 'es-ES', page: '1', sort_by: 'created_at.desc' }
  }

  const response = await getMoviesFromTMDB(options)
  favoriteStore.setFavoritesMovies(response)
}

export async function handleWatchlist(media_type: string, media_id: number, watchlist: boolean) {
  const authStore = useAuthStore()
  const options = {
    method: 'POST',
    url: 'https://api.themoviedb.org/3/account/account_id/watchlist?session_id=' + authStore.sessionId,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    data: { media_type: media_type, media_id: media_id, watchlist: watchlist }
  }

  const response = await axios.request(options)
  console.log('response of addWatchlist', response)
}

export async function getWatchlistMovies() {
  const authStore = useAuthStore()
  const watchlistStore = useWatchlistStore()
  const options: OptionsApi = {
    method: 'GET',
    url: '/account/account_id/watchlist/movies?session_id=' + authStore.sessionId,
    params: { language: 'es-ES', page: '1', sort_by: 'created_at.desc' }
  }

  const response = await getMoviesFromTMDB(options)
  watchlistStore.setWatchlistMovies(response)
}

export async function createList(name: string, description: string) {
  const authStore = useAuthStore()
  const options = {
    method: 'POST',
    url: 'https://api.themoviedb.org/3/list?session_id=' + authStore.sessionId,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    data: { name: name, description: description, language: 'es' }
  }

  await axios.request(options)
}

export async function getLists() {
  const listsStore = useListsStore()
  const authStore = useAuthStore()
  const options: OptionsApi = {
    method: 'GET',
    url: '/account/account_id/lists',
    params: { page: '1', session_id: authStore.sessionId }
  }

  const response = await tmdb.request(options)
  listsStore.setLists(response.data.results)
}

export async function addMovieToList(list_id: number, media_id: number) {
  const authStore = useAuthStore()
  const options = {
    method: 'POST',
    url: `https://api.themoviedb.org/3/list/${list_id}/add_item?session_id=${authStore.sessionId}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    data: { media_id: media_id }
  }

  const response = await axios.request(options)
  console.log('response of addMovieToList', response)
}

export async function removeMovieFromList(list_id: number, media_id: number) {
  const authStore = useAuthStore()
  const options = {
    method: 'POST',
    url: `https://api.themoviedb.org/3/list/${list_id}/remove_item?session_id=${authStore.sessionId}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    data: { media_id: media_id }
  }

  await axios.request(options)
}

export async function checkIfMovieIsInList(list_id: number, movie_id: number) {
  const options = {
    method: 'GET',
    url: `/list/${list_id}/item_status?`,
    params: { language: 'es-ES', movie_id }
  }

  const response = await tmdb.request(options)
  return response.data
}

export async function addRating(value: number, movie_id: number) {
  const authStore = useAuthStore()
  const options = {
    method: 'POST',
    url: `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${authStore.sessionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${apiKey}`
    },
    data: `{"value":${value}}`
  }
  console.log(options)

  const response = await axios.request(options)
  console.log('response of addRating', response.data)
}

export async function deleteRating(movie_id: number) {
  const authStore = useAuthStore()
  const options = {
    method: 'DELETE',
    url: `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${authStore.sessionId}`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }

  const response = await axios.request(options)
  console.log('response of deleteRating', response)
}

export async function getAccountStates(movie_id: number) {
  const authStore = useAuthStore()
  const options = {
    method: 'GET',
    url: `/movie/${movie_id}/account_states?session_id=${authStore.sessionId}`
  }
  console.log(options)

  const response = await tmdb.request(options)
  return response.data
}

export async function getMoviesByList(list_id: number) {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/list/${list_id}`,
    params: { language: 'es-ES', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  }

  const response = await axios.request<ListDetails>(options)
  return response.data
}
