import http from './http'

class UserService {
  login(email, password) {
    return http.post(
      `/user/signin`,
      {email, password},
      {
        withCredentials: true
      }
    )
  }

  refresh(rtf) {
    return http.post('/refresh', {rtf})
  }
}

export default new UserService()
