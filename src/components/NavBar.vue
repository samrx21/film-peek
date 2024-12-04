<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out" :class="{ 'bg-backBase bg-opacity-65 ': isScrolled }">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 transition-all duration-300 ease-in-out" :class="{ 'py-4': !isScrolled, 'py-2': isScrolled }">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <shape class="h-10 w-10 text-primary" />
        <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
          <span class="text-primary">Film</span>
          <span>Peek</span>
        </span>
      </RouterLink>
      <div class="flex md:order-2">
        <IconField class="hidden md:block input">
          <InputIcon class="pi pi-search !text-black !border-white" />
          <InputText v-model="toSearch" placeholder="Search" @keyup.enter="handleSearch" />
        </IconField>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-none">
          <li>
            <RouterLink to="/home" class="block py-2 px-3 text-white hover:text-tertiary rounded md:bg-transparent md:p-0" aria-current="page" active-class="border-b-2">Home</RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'lists', params: { type: 'favorites' } }"
              class="block py-2 px-3 text-white hover:text-tertiary rounded md:bg-transparent md:p-0"
              aria-current="page"
              active-class="border-b-2"
            >
              Favoritos
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'lists', params: { type: 'watchlist' } }"
              class="block py-2 px-3 text-white hover:text-tertiary rounded md:bg-transparent md:p-0"
              aria-current="page"
              active-class="border-b-2"
            >
              Siguiendo
            </RouterLink>
          </li>
          <li class="card flex justify-center">
            <Button type="button" label="Mis Listas" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" unstyled class="hover:text-tertiary" />
            <Menu ref="menu" id="overlay_menu" :model="listas" :popup="true">
              <template #item="{ item, props }">
                <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                  </a>
                </RouterLink>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </template>
            </Menu>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import 'primeicons/primeicons.css'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import shape from '@/assets/shape.svg'
import Menu from 'primevue/menu'
import Button from 'primevue/button'
import { useListsStore } from '@/stores'
import { getLists } from '@/services/accountService'
import { useRouter } from 'vue-router'

const router = useRouter()

import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const menu = ref()
const toggle = (event) => {
  menu.value.toggle(event)
}

const listas = ref([])

onMounted(async () => {
  const listsStore = useListsStore()
  await getLists()
  listas.value = [
    {
      label: 'Listas',
      items: listsStore.listsPreview.map((list) => ({
        label: list.name,
        icon: 'pi pi-list',
        command: () => {
          router.push({
            name: 'lists',
            params: { type: 'list' },
            query: {
              listId: list.id,
              listName: list.name
            }
          })
        }
      }))
    }
  ]
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toSearch = ref('')

function handleSearch() {
  if (toSearch.value.trim()) {
    router.push({
      name: 'lists',
      params: { type: 'search' },
      query: { search: toSearch.value.trim() }
    })
    toSearch.value = '' // Limpiar el input después de buscar
  }
}
</script>

<style scoped>
.input input {
  background: rgba(31, 29, 29, 0.4);

  &:focus {
    border: 1px solid #000;
  }
}
</style>
