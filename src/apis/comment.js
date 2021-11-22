import axios from './axios'

export default {
  getAllReviewCommentsReported: (params) =>
    axios.post('/admin/getAllReviewCommentsReported', params),
  enableReviewComment: (params) =>
    axios.post('/admin/enableReviewComment', params),
  disableReviewComment: (params) =>
    axios.post('/admin/disableReviewComment', params),
}
