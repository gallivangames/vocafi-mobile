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
}

export default new UserService()
