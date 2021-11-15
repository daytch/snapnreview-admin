import axios from './axios'

export default {
  login: (credentials) => axios.post('/user/login', credentials),
}
