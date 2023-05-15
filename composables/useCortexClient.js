export const useCortexClient = (resource) => {
  const getParams = (event, data) => {
    return [
      `https://${resource}/${event}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      }
    ]
  }

  const send = async (event, data = {}) => {
    return fetch(...getParams(resource, event, data)).then((res) =>
      res.ok ? res.json() : Promise.reject(res)
    )
  }

  return {
    send
  }
}
