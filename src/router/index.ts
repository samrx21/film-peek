import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
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
        genreName: route.query.genreName,
        query: route.query.search,
        listId: route.query.listId
      }),
      meta: {
        requiresAuth: (route: RouteLocationNormalized) => {
          const protectedTypes = ['favorites', 'watchlist', 'list']
          return protectedTypes.includes(route.params.type as string)
        }
      }
    }
  ]
})

// Guardia de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Si el usuario está autenticado y va a la página de login, redirige al home
  if (to.path === '/' && authStore.isAuthenticated) {
    next('/home') // Redirige al home
    return
  }

  // Verificar si la ruta requiere autenticación
  const requiresAuth = to.matched.some((record) => {
    if (typeof record.meta.requiresAuth === 'function') {
      return record.meta.requiresAuth(to)
    }
    return record.meta.requiresAuth
  })

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router
