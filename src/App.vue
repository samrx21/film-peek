<template>
  <div class="bg-dark w-full">
    <RouterView />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import Toast from 'primevue/toast'
</script>

<style>
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: #059669;
}
</style>
