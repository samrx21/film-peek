<template>
  <main class="min-h-screen flex items-center justify-center bg-backBase p-4">
    <div class="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-4">Bienvenido a FilmPeek</h1>
        <p class="text-gray-300">Inicia sesión con TMDB para disfrutar de estas funciones:</p>
      </div>

      <!-- Benefits List -->
      <ul class="space-y-3 mb-8 text-gray-300">
        <li class="flex items-center">
          <i class="pi pi-heart mr-2"></i>
          <span>Guarda tus películas favoritas</span>
        </li>
        <li class="flex items-center">
          <i class="pi pi-bookmark mr-2"></i>
          <span>Crea tu lista de "Ver más tarde"</span>
        </li>
        <li class="flex items-center">
          <i class="pi pi-list mr-2"></i>
          <span>Crea listas personalizadas</span>
        </li>
        <li class="flex items-center">
          <i class="pi pi-star mr-2"></i>
          <span>Califica películas</span>
        </li>
      </ul>

      <!-- Buttons -->
      <div class="space-y-4">
        <ButtonPrimary v-if="!authStore.isAuthenticated" @click="redirectToTMDB" label="Iniciar sesión con TMDB" class="w-full" />
        <Button label="Continuar como invitado" severity="secondary" @click="handleGuestLogin" class="w-full py-2 px-4 bg-gray-600 text-gray-400 rounded-md opacity-50 transition-colors" />
      </div>

      <!-- Footer -->
      <p class="mt-4 text-center text-sm text-gray-400">
        ¿No tienes una cuenta?
        <a href="https://www.themoviedb.org/signup" target="_blank" class="text-primary hover:text-primary/80 transition-colors">Regístrate en TMDB</a>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import redirectToTMDB from '@/composables/useAuth'
import { useAuthStore } from '@/stores/authStore'
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleGuestLogin() {
  router.push({ name: 'home' })
}
</script>
