<template>
  <div class="bg-dark w-full">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
</script>

<style>
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: #059669;
}
</style>
