<template>
  <section class="relative overflow-hidden h-[96vh]">
    <div class="flex transition-transform duration-500 h-full" :style="`transform: translateX(-${currentIndex * 100}%)`">
      <article v-for="movie in movies" :key="movie.id" class="w-full flex-shrink-0 h-full relative">
        <img :src="'https://image.tmdb.org/t/p/original/' + movie.backdrop_path" alt="" class="w-full h-full carousel__movie -z-10 relative" />
        <div class="absolute top-40 left-32 z-40 p-4 text-white flex flex-col gap-3">
          <h1 class="text-xl sm:text-3xl lg:text-6xl font-bold text-white line-clamp-2 pb-1">
            {{ movie.title }}
          </h1>
          <span class="flex items-center gap-1">
            <Star class="h-5" />
            <span class="pt-1">{{ roundToDecimal(movie.vote_average, 2) }} ({{ movie.vote_count }})</span>
            |
            <span class="pt-1">
              {{ movie.release_date.split('-')[0] }}
            </span>
          </span>
          <p class="w-4/6 line-clamp-6">{{ movie.overview }}</p>
          <ButtonPrimary label="Ver detalles" class="w-44 font-bold text-xl mt-5" @click="goToMovieDetails(movie.id)" />
        </div>
      </article>
    </div>
    <button @click="prev" class="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full"><i class="pi pi-angle-left" style="font-size: 3rem"></i></button>
    <button @click="next" class="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full"><i class="pi pi-angle-right" style="font-size: 3rem"></i></button>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ButtonPrimary from './ButtonPrimary.vue'
import { roundToDecimal } from '@/utils/math'
import Star from '@/assets/star.svg'
import type { Movie } from '@/types'
import { useRouter } from 'vue-router'
import 'primeicons/primeicons.css'

const props = defineProps<{
  movies: Movie[]
}>()

//Carrousel
const currentIndex = ref(0)

function next() {
  if (currentIndex.value < props.movies.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.movies.length - 1
  }
}

// View details
const router = useRouter()
function goToMovieDetails(id: number): void {
  router.push({ name: 'movie', params: { id } })
}
</script>

<style scoped>
.carousel__movie {
  mask-image: linear-gradient(#070d0c 20%, transparent);
}
</style>
