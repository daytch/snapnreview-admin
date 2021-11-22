import axios from './axios'

export default {
  getAllReportedQuestion: (params) =>
    axios.post('/admin/getAllReportedQuestion', params),
  enableQuestion: (params) => axios.post('/admin/enableQuestion', params),
  disableQuestion: (params) => axios.post('/admin/disableQuestion', params),
}
