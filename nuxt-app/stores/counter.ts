import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter',() => {
  const count = ref(0);

  const increment = () => {
    count.value++;
  }

  const decrement = () => {
    count.value--;
  }

  const getCount = computed(() => count.value)

  return {
    count, increment, decrement, getCount
  }

})
