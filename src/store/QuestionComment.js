import questionComment from '../apis/questionComment'

const QuestionComment = {
  state: {
    comment: [],
    totalRecord: 0,
    commentDetail: null
  },
  mutations: {
    setComment(state, payload) {
      state.comment = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
    setCommentDetail(state, payload) {
      state.commentDetail = payload
    }
  },
  actions: {
    async getAllCommentWithReported({ commit }, { skip, take }) {
      const response = await questionComment.getAllCommentWithReported({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {

        commit('setComment', response.data)
        commit('setTotalRecord', response.total)
      }
    },
    async getQuestionCommentById({ commit }, { questionCommentId }) {
      const response = await questionComment.getAllCommentWithReported({
        search: '',
        skip: 0,
        take: 1,
        questionCommentId
      })
      if (response.isSuccess) {

        commit('setCommentDetail', response.data[0])
      }
      else {
        commit('setCommentDetail', null)
      }
    }
  },
  getters: {},
}

export default QuestionComment
