import comment from './../apis/comment'

const Comment = {
  state: {
    comment: [],
    totalRecord: 0,
    commentDetail: null
  },
  mutations: {
    setComment(state, payload) {
      state.comment = payload
    },
    setCommentDetail(state, payload){
      state.commentDetail = payload;
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
  },
  actions: {
    async getAllReviewComment({ commit }, { skip, take }) {
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
    async getReviewCommentById({ commit }, { reviewCommentId }) {
      const response = await comment.getAllReviewCommentsReported({
        search: '',
        skip: 0,
        take: 1,
        reviewCommentId: reviewCommentId
      })
      if(response.isSuccess){
        commit('setCommentDetail', response.data[0])
      }
    }
  },
  getters: {},
}

export default Comment
