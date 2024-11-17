<template>
  <section>
    <div class="flex justify-between items-center">
      <h2 class="text-3xl mb-2">{{ props.title }}</h2>
      <span>Ver mas</span>
    </div>
    <swiper-container :slides-per-view="6" :navigation="true">
      <swiper-slide v-for="movie in props.movies" :key="movie.id" class="h-auto relative" @mouseover="handleHover(movie.id)" @mouseleave="handleHover(-99999)">
        <img :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path" alt="" class="w-full h-full -z-10 relative" />
        <span class="absolute top-2 right-2 flex gap-1 bg-backBase bg-opacity-50 rounded-md p-1 z-20" v-if="idHovering !== movie.id">
          <Star class="h-5" />
          {{ roundToDecimal(movie.vote_average, 2) }}
        </span>
        <transition name="fade">
          <div class="absolute top-0 h-full w-full bg-gradient-to-t from-backBase hover:bg-opacity-30 bg-backBase px-3 py-4 pb-1" v-if="idHovering === movie.id">
            <h1 class="text-xl sm:text-3xl lg:text-xl font-bold text-white line-clamp-2 pb-1">
              {{ movie.title }}
            </h1>
            <span class="flex items-center gap-1">
              <Star class="h-5" />
              <span class="pt-1">{{ roundToDecimal(movie.vote_average, 2) }}</span>
              |
              <span class="pt-1">
                {{ movie.release_date.split('-')[0] }}
              </span>
            </span>
            <p class="line-clamp-6 text-sm mt-2">{{ movie.overview }}</p>
            <ButtonPrimary label="Ver detalles" class="w-30 text-base mt-3" @click="goToMovieDetails(movie.id)" />
          </div>
        </transition>
      </swiper-slide>
      <swiper-slide class="flex justify-center items-center h-auto">
        <ButtonPrimary label="Ver mas" class="w-18" />
      </swiper-slide>
    </swiper-container>
  </section>
</template>
<script setup lang="ts">
import ButtonPrimary from './ButtonPrimary.vue'
import { roundToDecimal } from '@/utils/math'
import { useRouter } from 'vue-router'
import Star from '@/assets/star.svg'
import { ref } from 'vue'
import { register } from 'swiper/element/bundle'
import type { Movie } from '@/types'

const props = defineProps<{
  movies: Movie[]
  title: string
}>()

//Registrar elementos de Swiper
register()

let idHovering = ref(-99999)
function handleHover(id: number) {
  idHovering.value = id
}

// View details
const router = useRouter()
function goToMovieDetails(id: number): void {
  router.push({ name: 'movie', params: { id } })
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
