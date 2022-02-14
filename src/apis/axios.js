import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.snapnreview.com/',
  // baseURL: 'http://localhost:8080',
})
const UNAUTHORIZED = 401


instance.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  config.headers.common['x-access-token'] = token
  config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === UNAUTHORIZED) {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
    }
  },
)

export default instance
