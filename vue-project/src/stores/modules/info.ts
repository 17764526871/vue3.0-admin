import { defineStore } from 'pinia'

const useInfoStore = defineStore('info', {
  state: () => {
    return {
      count: 0,
      arr: [1, 2, 3],
    }
  },
  actions: {
    updateNum(num: number) {
      this.count = num
    },
  },
  getters: {
    total() {
      const result: number = this.arr.reduce((prev: number, next: number) => {
        return prev + next
      }, 0)
      return result
    },
  },
})
export default useInfoStore
