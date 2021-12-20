import axios from './axios'

export default {
  login: (credentials) => axios.post('/user/login', credentials),
  getAllUser: (params) =>
    axios.post('/admin/getAllUsers', params),
  disableUser: (params) =>axios.post('/admin/disableUser', params),
  enableUser: (params) =>axios.post('/admin/enableUser', params)
}
