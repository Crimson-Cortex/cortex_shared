import { useFetch } from '@vueuse/core'

export const useNuiCallback = (resource, event, body, timeout = 3000) => {
  const { isFetching, isFinished, data } = useFetch(
    `https://${resource}/${event}`,
    {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    },
    { timeout }
  )

  return {
    isFetching,
    isFinished,
    data
  }
}
