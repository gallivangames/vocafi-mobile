import http from './http'

export const getBooks = token => {
  return http.get(`/books`, {
    headers: {token},
    withCredentials: true
  })
}
