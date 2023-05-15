import { onUnmounted, onMounted, ref } from 'vue'

export const useNuiEvent = (app, method) => {
  const data = ref()

  const eventName = `${app}:${method}`

  const eventListener = (event) => {
    data.value = event.data
  }

  onMounted(() => {
    window.addEventListener(eventName, eventListener)
  })

  onUnmounted(() => {
    window.removeEventListener(eventName, eventListener)
  })

  return data
}
