import axios from './axios'

export default {
  GetAllReportedAnswer: (params) =>
    axios.post('/admin/GetAllReportedAnswer', params),
  enableAnswer: (params) => axios.post('/admin/enableAnswer', params),
  disableAnswer: (params) => axios.post('/admin/disableAnswer', params),
}
