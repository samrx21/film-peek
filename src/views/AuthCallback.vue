<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const requestToken = localStorage.getItem('request_token')

  if (requestToken) {
    try {
      await authStore.createSession(requestToken)
      router.push('/home') // Redirige al inicio después del login
    } catch (error) {
      console.error('Error al crear la sesión:', error)
    }
  }
})
</script>
