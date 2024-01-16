import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDcloudStore = defineStore('dcloud', () => {
  const verticals = ref([])

  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  // function increment() {
  //   count.value++
  // }

  async function loadVerticals () {
    const response = await fetch('/verticals')
    const text = await response.text()
    if (response.ok) {
      verticals.value = await JSON.parse(text)
      return
    }
    // TODO handle error
  }

  return { count, doubleCount, loadVerticals }
})
