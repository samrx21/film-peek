import { defineStore } from 'pinia'
import axios from 'axios'
const apiKey = import.meta.env.VITE_TMDB_TOKEN as string

interface AuthState {
  sessionId: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    sessionId: localStorage.getItem('session_id'),
    isAuthenticated: !!localStorage.getItem('session_id')
  }),

  actions: {
    async createSession(requestToken: string) {
      try {
        const options = {
          method: 'POST',
          url: 'https://api.themoviedb.org/3/authentication/session/new',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          data: { request_token: requestToken }
        }

        const response = await axios.request(options)
        console.log('response of token', response)

        this.sessionId = response.data.session_id

        this.isAuthenticated = true

        // Guardar en localStorage para persistencia
        if (this.sessionId) localStorage.setItem('session_id', this.sessionId)
      } catch (error) {
        console.error('Error creating session:', error)
        throw error
      }
    },

    logout() {
      this.sessionId = null
      this.isAuthenticated = false
      localStorage.removeItem('session_id')
    }
  }
})
