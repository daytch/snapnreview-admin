import axios from './axios'

export default {
  login: (credentials) => axios.post('/admin/login', credentials,),
  getAllUser: (params) =>
    axios.post('/admin/getAllUsers', params),
  disableUser: (params) =>axios.post('/admin/disableUser', params),
  enableUser: (params) =>axios.post('/admin/enableUser', params),
  registerAdmin: (params) =>axios.post('/admin/register', params)
}
