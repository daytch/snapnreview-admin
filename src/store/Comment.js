import comment from './../apis/comment'

const Comment = {
  state: {
    comment: [],
    totalRecord: 0
  },
  mutations: {
    setComment(state, payload) {
      state.comment = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
  },
  actions: {
    async getAllReviewComment({ commit }, {skip, take}) {
      const response = await comment.getAllReviewCommentsReported({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {
        let data = []
        for (const elm of response.data) {
          data.push({
            reviewCommentId: elm.reviewCommentId,
            comment: elm.comment,
            name: elm.name,
            isDisable: elm.isDisable,
          })
        }
        commit('setComment', data)
        commit('setTotalRecord', response.total)
      }
    },
  },
  getters: {},
}

export default Comment
