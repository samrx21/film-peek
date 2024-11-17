<template>
  <header>
    <NavBar />
  </header>
  <main v-if="movie" class="mb-20">
    <section class="w-full h-[90vh] relative z-0">
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
            <ButtonPrimary label="Agregar a favoritos" icon="pi pi-heart" />
            <ButtonPrimary label="Agregar a ver más tarde" icon="pi pi-bookmark" />
            <Button label="Califica esta película" icon="pi pi-star" outlined class="!text-ctmWht !border-ctmWht" />
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
              <a :href="'https://www.imdb.com/title/' + movie.imdb_id" target="_blank" class="text-ctmWht underline">{{ movie.title }}</a>
            </div>
          </div>
          <div>
            <h3 class="text-xl md:text-xl font-bold mb-2">Descripción general</h3>
            <p class="w-">{{ movie.overview }}</p>
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
  </main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieDetails } from '@/services/moviesApi'
import type { MovieDetails, WatchProvider, WatchProviderDescription } from '@/types'
import Star from '@/assets/star.svg'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import Button from 'primevue/button'
import { roundToDecimal } from '@/utils/math'
import { register } from 'swiper/element/bundle'
import { ref } from 'vue'

const route = useRoute()
const movie = ref<MovieDetails>()
//Registrar elementos de Swiper
register()

onMounted(async () => {
  let response = await getMovieDetails(route.params.id as string)
  if (response) {
    movie.value = response
    console.log('datails', movie.value)

    movie.value['watch/providers']
  }
})

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
</script>

<style scoped></style>
