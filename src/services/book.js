import http from './http'

export const getBooks = token => {
  return http.get(`/books`, {
    headers: {token},
    withCredentials: true
  })
}

export const getBook = (id, token) => {
  return http.get('/books', {
    params: {id},
    headers: {token},
    withCredentials: true
  })
}
