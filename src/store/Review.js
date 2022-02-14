import review from './../apis/review'

const Review = {
  state: {
    review: [],
    totalRecord: 0,
    reviewDetail: null
  },
  mutations: {
    setReview(state, payload) {
      state.review = payload
    },
    setTotal(state, payload) {
      state.totalRecord = payload
    },
    setReviewDetail(state, payload) {
      state.reviewDetail = payload
    }
  },
  actions: {
    async getAllReview({ commit }, { skip, take }) {
      const response = await review.getAllReviewReported({
        search: '',
        skip: skip,
        take: take
        
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
    async getReviewById({ commit }, { skip, take, reviewId }) {

      
      const response = await review.getAllReviewReported({
        search: '',
        skip: skip,
        take: take,
        reviewId: reviewId
      })
      if (response.isSuccess) {
        console.log(response.data[0])
        if (response.data.length > 0) {
          commit('setReviewDetail', response.data[0])
        }

      }
    },
  },
  getters: {},
}

export default Review
