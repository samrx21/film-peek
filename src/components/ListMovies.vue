<template>
  <div class="mt-5 flex gap-7 flex-wrap">
    <template v-for="movie in props.movies" :key="movie.id">
      <CardMovie :movie="movie" />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Movie } from '@/types'
import CardMovie from './CardMovie.vue'

const props = defineProps<{
  movies: Movie[]
}>()
</script>
<style scoped></style>
