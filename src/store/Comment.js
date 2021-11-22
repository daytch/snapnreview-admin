import comment from './../apis/comment'

const Comment = {
  state: {
    comment: [],
  },
  mutations: {
    setComment(state, payload) {
      state.comment = payload
    },
  },
  actions: {
    async getAllReviewComment({ commit }) {
      const response = await comment.getAllReviewCommentsReported({
        search: '',
        skip: 0,
        take: 100,
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
      }
    },
  },
  getters: {},
}

export default Comment
