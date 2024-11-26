import { getMoviesFromTMDB } from '@/services/tmdbService'
import type { OptionsApi } from '@/types'
import axios from 'axios'
const apiKey = import.meta.env.VITE_TMDB_ACCESS_TOKEN_AUTH as string
import { useAuthStore } from '@/stores/authStore'
import { useFavoriteStore } from '@/stores/favoriteStore'

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
  console.log('Favoritesdasdasdasdasd:', favoriteStore.favorites)
  return favoriteStore.favorites
}
