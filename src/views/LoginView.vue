<template>
  <ButtonPrimary v-if="!authStore.isAuthenticated" @click="redirectToTMDB" label="Iniciar sesión con TMDB" />
  <button v-else @click="authStore.logout">Cerrar sesión</button>
</template>

<script setup lang="ts">
import redirectToTMDB from '@/composables/useAuth'
import { useAuthStore } from '@/stores/authStore'
import ButtonPrimary from '@/components/ButtonPrimary.vue'

const authStore = useAuthStore()
</script>
