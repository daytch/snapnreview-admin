import review from './../apis/review'

const Review = {
  state: {
    review: [],
  },
  mutations: {
    setReview(state, payload) {
      state.review = payload
    },
  },
  actions: {
    async getAllReview({ commit }) {
      const response = await review.getAllReviewReported({
        search: '',
        skip: 0,
        take: 100,
      })
      if (response.isSuccess) {
        let data = []
        for (const elm of response.data) {
          data.push({
            reviewId: elm.reviewId,
            reviewDescription: elm.reviewDescription,
            productName: elm.productName,
            categoryName: elm.categoryName,
            name: elm.name,
            answerDescription: elm.answerDescription,
            isDisable: elm.isDisable,
          })
        }
        commit('setReview', data)
      }
    },
  },
  getters: {},
}

export default Review
