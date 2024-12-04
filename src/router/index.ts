import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/views/MovieDetails.vue')
    },
    {
      path: '/auth/callback',
      name: 'authCallback',
      component: () => import('@/views/AuthCallback.vue')
    },
    {
      path: '/lists/:type',
      name: 'lists',
      component: () => import('@/views/ListView.vue'),
      props: (route) => ({
        genreId: route.query.genreId,
        query: route.query.search,
        listId: route.query.listId
      })
    }
  ]
})

// Guardia de navegación para rutas protegidas -- Sin utilizar
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si el usuario está autenticado y va a la página de login, redirige al home
  if (to.path === '/' && authStore.isAuthenticated) {
    next('/home') // Redirige al home
    return
  }

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
