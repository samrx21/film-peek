<template>
  <main class="my-32 mx-14">
    <NavBar />
    <section>
      <h1 class="text-3xl font-bold mb-5">{{ title }}</h1>
      <p class="text-lg text-gray-500 mb-5" v-if="route.params.type == 'list' && route.query.listId">{{ descriptionList }}</p>
      <ListMovies :movies="movies" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Movie } from '@/types'
import ListMovies from '@/components/ListMovies.vue'
import { getFavoritesMovies, getWatchlistMovies, getMoviesByList } from '@/services/accountService'
import { useFavoriteStore, useWatchlistStore } from '@/stores'

const route = useRoute()
const movies = ref<Movie[]>([])
const descriptionList = ref('')

// Título dinámico según el tipo
const title = computed(() => {
  switch (route.params.type) {
    case 'favorites':
      return 'Películas Favoritas'
    case 'watchlist':
      return 'Lista de Seguimiento'
    case 'genre':
      return `Películas de ${route.query.genreName || 'Género'}`
    case 'search':
      return `Resultados para: ${route.query.search}`
    case 'list':
      return route.query.listName || 'Lista'
    default:
      return 'Películas'
  }
})

// Cargar películas según el tipo
async function loadMovies() {
  const favoriteStore = useFavoriteStore()
  const watchlistStore = useWatchlistStore()
  // const listsStore = useListsStore()

  try {
    switch (route.params.type) {
      case 'favorites':
        await getFavoritesMovies()
        movies.value = favoriteStore.FavoritesMovies
        break

      case 'watchlist':
        await getWatchlistMovies()
        movies.value = watchlistStore.watchlistMovies
        break

      // case 'genre':
      //   if (route.query.genreId) {
      //     const response = await getMoviesByGenre(route.query.genreId as string)
      //     movies.value = response
      //   }
      //   break

      // case 'search':
      //   if (route.query.search) {
      //     const response = await getMoviesBySearch(route.query.search as string)
      //     movies.value = response
      //   }
      //   break

      case 'list':
        if (route.query.listId) {
          const response = await getMoviesByList(+route.query.listId)
          movies.value = response.items
          descriptionList.value = response.description
        }
        break
    }
  } catch (error) {
    console.error('Error al cargar las películas:', error)
  }
}

// Cargar películas al montar el componente
onMounted(() => {
  loadMovies()
})

// Observar cambios en la ruta y query paramspara recargar películas
watch([() => route.params.type, () => route.query], () => {
  loadMovies()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>
