export const formatQueryPayload = dataToSend => {
  const formBody = []
  for (const key in dataToSend) {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(dataToSend[key])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}
