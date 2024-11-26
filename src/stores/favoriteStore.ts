import { defineStore } from 'pinia'
import type { Movie } from '@/types'

interface FavoriteState {
  favorites: Array<Number>
}

export const useFavoriteStore = defineStore('favorite', {
  state: (): FavoriteState => ({
    favorites: []
  }),

  actions: {
    setFavoritesMovies(favoritesList: Array<Movie>) {
      this.favorites = favoritesList.map((movie) => movie.id)
    }
  }
})
