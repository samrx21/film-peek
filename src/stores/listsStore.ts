import { defineStore } from 'pinia'
import type { ListPreview } from '@/types'

interface ListsState {
  listsPreview: ListPreview[]
}

export const useListsStore = defineStore('lists', {
  state: (): ListsState => ({
    listsPreview: []
  }),

  actions: {
    setLists(lists: ListPreview[]) {
      this.listsPreview = lists
    }
  }
})
