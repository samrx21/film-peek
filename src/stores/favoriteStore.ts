import { defineStore } from 'pinia'
import type { Movie } from '@/types'

interface FavoriteState {
  favorites: number[]
  FavoritesMovies: Array<Movie>
}

export const useFavoriteStore = defineStore('favorite', {
  state: (): FavoriteState => ({
    favorites: [],
    FavoritesMovies: []
  }),

  actions: {
    setFavoritesMovies(movies: Array<Movie>) {
      this.favorites = movies.map((movie) => movie.id)
      this.FavoritesMovies = movies
    }
  }
})
