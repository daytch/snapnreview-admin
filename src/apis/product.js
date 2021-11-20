import axios from './axios'

export default {
  getAllReportedProduct: (params) =>
    axios.post('/admin/getAllReportedProduct', params),
  enableProduct: (params) => axios.post('/admin/enableProduct', params),
  disableProduct: (params) => axios.post('/admin/disableProduct', params),
}
