import axios from './axios'

export default {
  getAllProductRepots: (params) =>
    axios.post('/admin/getAllProductRepots', params),
}
