import http from './http'

export const recordActivity = (payload, token) => {
  return http.post(`/action`, payload, {
    headers: {token},
    withCredentials: true
  })
}
