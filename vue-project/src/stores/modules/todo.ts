import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todo = ref([{}])
  return {
    todo,
  }
})
