import answer from './../apis/answer'

const Answer = {
  state: {
    answer: [],
    totalRecord: 0
  },
  mutations: {
    setAnswer(state, payload) {
      state.answer = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
  },
  actions: {
    async getAllAnswer({ commit }, {skip, take}) {
      const response = await answer.GetAllReportedAnswer({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {
        let data = []
        for (const elm of response.data) {
          data.push({
            questionAnswerID: elm.questionAnswerID,
            question: elm.question,
            answerDescription: elm.answerDescription,
            detail: elm.questionDescription,
            categoryName: elm.categoryName,
            whoAnswer: elm.whoAnswer,
            isDisable: elm.isDisable,
          })
        }
        commit('setAnswer', data)
        commit('setTotalRecord', response.total)
      }
    },
  },
  getters: {},
}

export default Answer
