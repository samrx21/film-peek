import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

import Aura from '@primevue/themes/aura'

import App from './App.vue'
import NavBar from './components/NavBar.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.component('NavBar', NavBar)
app.directive('tooltip', Tooltip)

app.mount('#app')
