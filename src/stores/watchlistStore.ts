import { defineStore } from 'pinia'
import type { Movie } from '@/types'

interface WatchlistState {
  watchlist: Array<Number>
  watchlistMovies: Array<Movie>
}

export const useWatchlistStore = defineStore('watchlist', {
  state: (): WatchlistState => ({
    watchlist: [],
    watchlistMovies: []
  }),

  actions: {
    setWatchlistMovies(watchlistList: Array<Movie>) {
      this.watchlist = watchlistList.map((movie) => movie.id)
      this.watchlistMovies = watchlistList
    }
  }
})
