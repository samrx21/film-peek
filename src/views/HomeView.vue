<template>
  <header class="relative">
    <NavBar />
    <CarouselMovies :movies="popularMovies" />
  </header>
  <main class="h-auto bg-backBase py-20 px-11 relative space-y-10">
    <MovieCategory v-for="collection in movieCollections" :key="collection.id" :title="collection.name" :movies="collection.movies" />
  </main>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref, onMounted } from 'vue'
import { getPopularMovies, getTopRatedMovies, getMoviesByGenre } from '@/services/moviesApi'
import CarouselMovies from '@/components/CarouselMovies.vue'
import MovieCategory from '@/components/MovieCategory.vue'
import type { Movie, MovieCollection, Genre } from '@/types'

let popularMovies = ref<Movie[]>([])

let movieCollections = ref<MovieCollection[]>([])

let genres: Genre[] = [
  {
    id: 28,
    name: 'Acción'
  },
  {
    id: 12,
    name: 'Aventura'
  },
  {
    id: 16,
    name: 'Animación'
  },
  {
    id: 35,
    name: 'Comedia'
  },
  {
    id: 80,
    name: 'Crimen'
  },
  {
    id: 99,
    name: 'Documental'
  },
  {
    id: 18,
    name: 'Drama'
  },
  {
    id: 10751,
    name: 'Familia'
  },
  {
    id: 14,
    name: 'Fantasía'
  },
  {
    id: 36,
    name: 'Historia'
  },
  {
    id: 27,
    name: 'Terror'
  },
  {
    id: 10402,
    name: 'Música'
  },
  {
    id: 9648,
    name: 'Misterio'
  },
  {
    id: 10749,
    name: 'Romance'
  },
  {
    id: 878,
    name: 'Ciencia ficción'
  },
  {
    id: 10770,
    name: 'Película de TV'
  },
  {
    id: 53,
    name: 'Suspense'
  },
  {
    id: 10752,
    name: 'Bélica'
  },
  {
    id: 37,
    name: 'Western'
  }
]

onMounted(async () => {
  let popularMoviesObtained = await getPopularMovies()
  if (popularMoviesObtained) {
    popularMovies.value.push(...popularMoviesObtained)
  }
  let topRatedMovies: Movie[]
  topRatedMovies = await getTopRatedMovies()
  movieCollections.value.push({ id: 1, type: 'popular', name: 'Top Ranking', movies: topRatedMovies })

  genres.map(async (genre) => {
    let movies = await getMoviesByGenre(genre.id)
    movieCollections.value.push({ id: genre.id, type: 'genre', name: genre.name, movies })
  })
})
</script>
