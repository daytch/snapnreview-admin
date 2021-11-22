import axios from './axios'

export default {
  getAllReviewReported: (params) =>
    axios.post('/admin/getAllReviewReported', params),
  enableReview: (params) => axios.post('/admin/enableReview', params),
  disableReview: (params) => axios.post('/admin/disableReview', params),
}
