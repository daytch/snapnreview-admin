import axios from './axios'

export default {
  getAllCommentWithReported: (params) =>
    axios.post('/admin/getAllCommentWithReported', params),
    enableQuestionComment: (params) =>
    axios.post('/admin/enableQuestionComment', params),
    disableQuestionComment: (params) =>
    axios.post('/admin/disableQuestionComment', params),
}
