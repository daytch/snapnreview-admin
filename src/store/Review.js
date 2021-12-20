import review from './../apis/review'

const Review = {
  state: {
    review: [],
    totalRecord: 0,
  },
  mutations: {
    setReview(state, payload) {
      state.review = payload
    },
    setTotal(state, payload){
      state.totalRecord = payload
    }
  },
  actions: {
    async getAllReview({ commit }, {skip, take}) {
      const response = await review.getAllReviewReported({
        search: '',
        skip: skip,
        take: take,
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
        commit('setTotal', response.total);
      }
    },
  },
  getters: {},
}

export default Review
