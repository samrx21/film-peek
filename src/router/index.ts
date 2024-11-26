import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomeView from '@/views/HomeView.vue'
import MovieDetails from '@/views/MovieDetails.vue'
import LoginView from '@/views/LoginView.vue'
import AuthCallback from '@/views/AuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieDetails
    },
    {
      path: '/auth/callback',
      name: 'authCallback',
      component: AuthCallback
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
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
