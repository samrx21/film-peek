<template>
  <header>
    <NavBar />
  </header>
  <main v-if="movie" class="mb-20">
    <section class="w-full h-[90vh] relative z-0 mb-20">
      <img :src="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path" alt="" class="w-full h-[90vh] -z-10 blur-2xl" />
      <div class="flex absolute top-32 z-40 px-16 gap-24 w-full">
        <div class="flex flex-col gap-5">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-3xl md:text-4xl font-bold">{{ movie.title }}</h1>
              <div class="flex justify-center items-center gap-1 min-w-36">
                <Star class="h-5" />
                <span class="pt-1">{{ roundToDecimal(movie.vote_average, 1) }} ({{ movie.vote_count }} votos)</span>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <span class="flex items-center gap-1">
                {{ movie.release_date.split('-')[0] }}
              </span>
              <span>|</span>
              <span class="flex items-center gap-2">
                <i class="pi pi-clock" style="color: #50f296"></i>
                {{ movie.runtime }} min
              </span>
              <span>|</span>
              <div v-for="(genre, index) in movie.genres" :key="genre.id" class="flex items-center gap-2">
                <span>
                  {{ genre.name }}
                </span>
                <span v-if="index !== movie.genres.length - 1" class="text-xl font-extrabold">·</span>
              </div>
            </div>
          </div>
          <div class="flex gap-4">
            <ButtonPrimary label="Agregar a favoritos" icon="pi pi-heart" @click="updateFavorite(movie.id, true)" v-if="!favoriteStore.favorites.includes(movie.id)" />
            <ButtonPrimary label="Eliminar de favoritos" icon="pi pi-heart-fill" @click="updateFavorite(movie.id, false)" v-else />
            <ButtonPrimary label="Ver más tarde" icon="pi pi-bookmark" @click="updateWatchlist(movie.id, true)" v-if="!watchlistStore.watchlist.includes(movie.id)" />
            <ButtonPrimary label="Para ver más tarde" icon="pi pi-bookmark-fill" @click="updateWatchlist(movie.id, false)" v-else />

            <MultiSelect
              ref="multiSelectLists"
              v-model="listsSelected"
              :options="listsStore.listsPreview"
              optionLabel="name"
              filter
              placeholder="Agregar a lista"
              :maxSelectedLabels="2"
              scrollHeight="12rem"
              :disabled="!authStore.isAuthenticated"
            >
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
              <template #dropdownicon>
                <i class="pi pi-list" />
              </template>
              <template #header>
                <div class="font-medium px-3 py-2">Tus listas</div>
              </template>
              <template #footer="">
                <div class="p-3 flex justify-between">
                  <Button label="Crear Lista" severity="secondary" text size="small" icon="pi pi-plus" @click="showCreateList = true" />
                  <Button label="Guardar" text size="small" icon="pi pi-list-check" @click="updateLists" />
                </div>
              </template>
            </MultiSelect>

            <Dialog v-model:visible="showCreateList" modal header="Crear nueva lista" :style="{ width: '25rem' }">
              <div class="flex items-center gap-4 mb-4">
                <label for="nameList" class="font-semibold w-24">Nombre</label>
                <InputText id="nameList" class="flex-auto" autocomplete="off" v-model="listToCreate.name" />
              </div>
              <div class="flex items-center gap-4 mb-8">
                <label for="descList" class="font-semibold w-24">Descripcion</label>
                <InputText id="descList" class="flex-auto" autocomplete="off" v-model="listToCreate.description" />
              </div>
              <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="showCreateList = false"></Button>
                <Button type="button" label="Save" @click="handleCreateList"></Button>
              </div>
            </Dialog>

            <Button
              :label="rating == 0 ? 'Califica esta película' : 'Mi calificación: ' + rating.toString()"
              :icon="rating == 0 ? 'pi pi-star' : 'pi pi-star-fill'"
              outlined
              :iconPos="rating == 0 ? 'left' : 'right'"
              class="!text-white !border-white"
              @click="handleRate"
            />

            <Dialog v-model:visible="showRateMovie" modal header="Califica esta película" @hide="handldeHideRate" :style="{ width: '25rem' }">
              <div class="flex items-center gap-4 mb-4">
                <label for="rating" class="font-semibold w-24">Calificación</label>
                <Rating v-model="rating" id="rating" :stars="10" />
              </div>
              <div class="flex justify-end gap-2">
                <Button type="button" label="Eliminar Calificacion" severity="danger" @click="handleDeleteRating(movie.id)"></Button>
                <Button type="button" label="Save" @click="handleAddRating(rating, movie.id)"></Button>
              </div>
            </Dialog>
          </div>
          <div>
            <div class="flex items-center gap-3">
              <h3 class="text-xl md:text-xl font-bold">Proveedores:</h3>
              <div class="flex gap-4">
                <template v-for="(provider, index) in filterProviders(movie['watch/providers'].results.CO)" :key="index">
                  <img :src="'https://image.tmdb.org/t/p/original/' + provider.logo_path" :alt="'Logo de ' + provider.provider_name" v-tooltip="provider.provider_name" class="w-10 rounded-xl" />
                </template>
                <div v-if="filterProviders(movie['watch/providers'].results.CO).length == 0">
                  <span>No hay proveedores disponibles para tú pais</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1">
                <h3 class="text-xl md:text-xl font-bold">Ver en</h3>
                <img width="48" height="48" src="https://img.icons8.com/color/48/imdb.png" alt="imdb" />
                :
              </div>
              <a :href="'https://www.imdb.com/title/' + movie.imdb_id" target="_blank" class="text-white underline">{{ movie.title }}</a>
            </div>
          </div>
          <div>
            <h3 class="text-xl md:text-xl font-bold mb-2">Descripción general</h3>
            <p>{{ movie.overview }}</p>
          </div>
        </div>
        <div class="max-w-[256px]">
          <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" alt="" class="w-full min-w-full rounded" />
        </div>
      </div>
    </section>
    <section class="mx-14 mt-5 relative z-0 flex gap-8 flex-col">
      <div>
        <h3 class="text-3xl font-bold mb-3">Multimedia</h3>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-3">Videos</h3>
        <swiper-container :slides-per-view="3" space-between="20" :navigation="true">
          <swiper-slide v-for="(video, index) in movie.videos.results" :key="index" class="h-auto">
            <lite-youtube :videoid="video.key" class="rounded-md"></lite-youtube>
          </swiper-slide>
        </swiper-container>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-3">Imágenes</h3>
        <swiper-container :slides-per-view="5" space-between="20" :navigation="true">
          <swiper-slide v-for="(image, index) in movie.images.backdrops" :key="index" class="h-auto">
            <img :src="'https://image.tmdb.org/t/p/original/' + image.file_path" alt="" class="rounded-md" />
          </swiper-slide>
        </swiper-container>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-3">Posters</h3>
        <swiper-container
          :slides-per-view="6"
          space-between="20"
          :navigation="true"
          class="max-h-72"
          :breakpoints="{
            1600: {
              slidesPerView: 9
            }
          }"
        >
          <swiper-slide v-for="(image, index) in movie.images.posters" :key="index" class="max-h-72 h-auto">
            <img :src="'https://image.tmdb.org/t/p/original/' + image.file_path" alt="" class="rounded-md h-72 w-full" />
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
    <section class="mx-14 mt-14 flex gap-8 flex-col">
      <div>
        <h3 class="text-3xl font-bold mb-3">Producción</h3>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-3">Productoras</h3>
        <ul class="w-full flex gap-5 justify-around bg-white py-5 rounded-md border-2 border-black">
          <li v-for="company in movie.production_companies" :key="company.id" class="flex items-center gap-2">
            <img v-if="company.logo_path" :src="'https://image.tmdb.org/t/p/original/' + company.logo_path" :alt="company.name" class="w-32 rounded-md" />
            <span class="text-black" v-else>{{ company.name }}</span>
          </li>
        </ul>
      </div>
      <div class="flex justify-around mt-5">
        <div class="flex flex-col gap-4">
          <h3 class="text-6xl font-bold mb-3">Presupuesto</h3>
          <p class="text-4xl flex">
            {{ movie.budget ? formatCurrency(movie.budget) : 'NaN' }}
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <h3 class="text-6xl font-bold mb-3">Recaudación</h3>
          <p class="text-4xl flex gap-2">
            {{ movie.revenue ? formatCurrency(movie.revenue) : 'NaN' }}
          </p>
        </div>
      </div>
    </section>
    <section class="mx-14 mt-14 flex gap-8 flex-col">
      <div>
        <h3 class="text-3xl font-bold mb-3">Créditos</h3>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-3">Elenco</h3>
        <ul class="w-full flex gap-5 flex-wrap justify-center">
          <template v-for="cast in movie.credits.cast" :key="cast.id">
            <li class="flex flex-col items-center gap-2 max-w-32" v-if="cast.profile_path">
              <img :src="'https://image.tmdb.org/t/p/original/' + cast.profile_path" :alt="cast.name" class="w-32 rounded-full object-cover" />
              <span class="text-center">{{ cast.name }}</span>
              <span class="text-center text-sm text-gray-500">{{ cast.character }}</span>
            </li>
          </template>
          <template v-for="cast in movie.credits.cast" :key="cast.id">
            <li class="flex flex-col items-center justify-center gap-2 max-w-32" v-if="!cast.profile_path">
              <span class="text-center">{{ cast.name }}</span>
              <span class="text-center text-sm text-gray-500">{{ cast.character }}</span>
            </li>
          </template>
        </ul>
      </div>
      <div>
        <h3 class="text-2xl font-bold mb-3">Equipo</h3>
        <ul class="w-full flex gap-5 flex-wrap">
          <template v-for="crew in movie.credits.crew" :key="crew.id">
            <li class="flex flex-col items-center gap-2 max-w-32" v-if="crew.profile_path">
              <img :src="'https://image.tmdb.org/t/p/original/' + crew.profile_path" :alt="crew.name" class="w-32 h-32 rounded-full object-cover" />
              <span class="text-center">{{ crew.name }}</span>
              <span class="text-center text-sm text-gray-500">{{ crew.job }}</span>
            </li>
          </template>
        </ul>
      </div>
    </section>
    <section class="mx-14 mt-14 flex gap-8 flex-col">
      <MovieCategory :movies="movie.similar.results" title="Similares" />
    </section>
    <section class="mx-14 mt-14 flex gap-8 flex-col">
      <div>
        <h3 class="text-3xl font-bold mb-3">Reseñas</h3>
      </div>
      <div v-if="movie.reviews">
        <ul class="w-full flex flex-col gap-5">
          <li v-for="review in movie.reviews" :key="review.id" class="bg-white p-5 rounded-md shadow-md">
            <div class="flex justify-between mb-3">
              <div class="flex items-center gap-3 mb-3">
                <img
                  :src="review.author_details.avatar_path ? 'https://image.tmdb.org/t/p/original/' + review.author_details.avatar_path : 'https://via.placeholder.com/50'"
                  alt="Avatar"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 class="text-xl font-bold text-black">{{ review.author }}</h4>
                  <span class="text-sm text-gray-500">{{ new Date(review.created_at).toLocaleDateString() }}</span>
                </div>
              </div>
              <div class="flex items-center">
                <Star class="h-5" v-for="(star, index) in review.author_details.rating" :key="index" />
              </div>
            </div>

            <p class="text-black">{{ review.content }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay reseñas disponibles para esta película.</p>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieDetails } from '@/services/moviesApi'
import { getFavoritesMovies, getWatchlistMovies, checkIfMovieIsInList, addMovieToList, removeMovieFromList, addRating, deleteRating, getAccountStates } from '@/services/accountService'
import type { MovieDetails, WatchProvider, WatchProviderDescription, ListPreview } from '@/types'
import Star from '@/assets/star.svg'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Rating from 'primevue/rating'
import { roundToDecimal } from '@/utils/math'
import { register } from 'swiper/element/bundle'
import { ref, watch } from 'vue'
import MovieCategory from '@/components/MovieCategory.vue'
import { handleFavorite, handleWatchlist, getLists, createList } from '@/services/accountService'
import { useFavoriteStore, useWatchlistStore, useListsStore, useAuthStore } from '@/stores'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const favoriteStore = useFavoriteStore()
const watchlistStore = useWatchlistStore()
const listsStore = useListsStore()
const authStore = useAuthStore()
const movie = ref<MovieDetails>()
const toast = useToast()
//Registrar elementos de Swiper
register()

async function loadMovieDetails() {
  let response = await getMovieDetails(route.params.id as string)
  if (response) {
    movie.value = response
    // console.log('datails', movie.value)

    if (authStore.isAuthenticated) {
      await getFavoritesMovies()
      await getWatchlistMovies()
      await getLists()

      await checkMovieInLists(movie.value.id)

      let accountStates = await getAccountStates(movie.value.id)
      if (accountStates.rated) {
        rating.value = accountStates.rated.value
      }
    }
  }
}

// Observar cambios en el parámetro `id` y volver a cargar los detalles
watch(
  () => route.params.id,
  () => {
    loadMovieDetails()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
)

onMounted(async () => {
  await loadMovieDetails()
})

async function updateFavorite(id: number, isFavorite: boolean) {
  if (!authStore.isAuthenticated) {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Inicia sesion con TMDB para disfrutar de todas las funciones', life: 3000 })
    return
  }
  let response = await handleFavorite('movie', id, isFavorite)
  if (response && response.data.success) {
    await getFavoritesMovies()
    if (isFavorite) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Agregado a favoritos', life: 3000 })
    } else {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Eliminado de favoritos', life: 3000 })
    }
  }
}

async function updateWatchlist(id: number, isWatchlist: boolean) {
  if (!authStore.isAuthenticated) {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Inicia sesion con TMDB para disfrutar de todas las funciones', life: 3000 })
    return
  }
  let response = await handleWatchlist('movie', id, isWatchlist)
  if (response && response.data.success) {
    await getWatchlistMovies()
    if (isWatchlist) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Agregado a lista de seguimiento', life: 3000 })
    } else {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Eliminado de lista de seguimiento', life: 3000 })
    }
  }
}

const listsSelected = ref<ListPreview[]>([])
let showCreateList = ref(false)
let listToCreate = ref({ name: '', description: '' })

async function handleCreateList() {
  await createList(listToCreate.value.name, listToCreate.value.description)
  await getLists()
  showCreateList.value = false
}

let copiedArray = ref<ListPreview[]>([])
const multiSelectLists = ref()
function updateLists() {
  if (movie.value && movie.value.id) {
    const movie_id = movie.value.id
    if (!areListsEqual(copiedArray.value, listsSelected.value)) {
      listsSelected.value.forEach(async (list) => {
        if (!copiedArray.value.some((item) => item.id === list.id)) {
          await addMovieToList(list.id, movie_id)
        }
      })

      copiedArray.value.forEach(async (list) => {
        if (!listsSelected.value.some((item) => item.id === list.id)) {
          await removeMovieFromList(list.id, movie_id)
        }
      })

      copiedArray.value = JSON.parse(JSON.stringify(listsSelected.value))
    }
    multiSelectLists.value.hide()
  }
}
function areListsEqual(array1: ListPreview[], array2: ListPreview[]): boolean {
  // Verificar si tienen la misma longitud
  if (array1.length !== array2.length) return false

  // Ordenar los arrays por id para asegurar la comparación
  const sortedArray1 = [...array1].sort((a, b) => a.id - b.id)
  const sortedArray2 = [...array2].sort((a, b) => a.id - b.id)

  // Comparar cada elemento
  return sortedArray1.every((item, index) => item.id === sortedArray2[index].id)
}

async function checkMovieInLists(movie_id: number) {
  //console.log('movie_id', movie_id) //8498979
  for (const list of listsStore.listsPreview) {
    const isInList = await checkIfMovieIsInList(list.id, movie_id)
    //console.log('list.id', list.id) // 912649
    if (isInList.item_present) {
      listsSelected.value.push(list)
    }
    // Puedes realizar otras acciones si la película está en la lista
  }
  copiedArray.value = JSON.parse(JSON.stringify(listsSelected.value))
}

let showRateMovie = ref(false)
let rating = ref(0)
let tempRating = ref(0)

function handleRate() {
  if (!authStore.isAuthenticated) {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Inicia sesion con TMDB para disfrutar de todas las funciones', life: 3000 })
    return
  }
  tempRating.value = +rating.value
  showRateMovie.value = true
}

async function handleAddRating(value: number, movie_id: number) {
  let response = await addRating(value, movie_id)
  if (response && response.data.success) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Calificación agregada correctamente', life: 3000 })
  }
  ratingChanged.value = true
  showRateMovie.value = false
}

async function handleDeleteRating(movie_id: number) {
  let response = await deleteRating(movie_id)
  if (response && response.data.success) {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Calificación eliminada correctamente', life: 3000 })
  }
  ratingChanged.value = true
  showRateMovie.value = false
}

let ratingChanged = ref(false)
function handldeHideRate() {
  if (!ratingChanged.value) {
    rating.value = tempRating.value
    ratingChanged.value = false
  }
}

function filterProviders(providers: WatchProvider): WatchProviderDescription[] {
  if (!providers) return []

  let uniqueProviders = new Set()
  let newProviders: WatchProviderDescription[] = []
  if (providers.flatrate) {
    providers.flatrate.forEach((provider) => {
      uniqueProviders.add(provider.provider_id)
      newProviders.push(provider)
    })
  }
  if (providers.buy) {
    providers.buy.forEach((provider) => {
      if (!uniqueProviders.has(provider.provider_id)) {
        uniqueProviders.add(provider.provider_id)
        newProviders.push(provider)
      }
    })
  }
  if (providers.rent) {
    providers.rent.forEach((provider) => {
      if (!uniqueProviders.has(provider.provider_id)) {
        uniqueProviders.add(provider.provider_id)
        newProviders.push(provider)
      }
    })
  }
  return newProviders
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
</script>

<style scoped></style>
