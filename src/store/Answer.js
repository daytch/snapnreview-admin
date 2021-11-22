import answer from './../apis/answer'

const Answer = {
  state: {
    answer: [],
  },
  mutations: {
    setAnswer(state, payload) {
      state.answer = payload
    },
  },
  actions: {
    async getAllAnswer({ commit }) {
      const response = await answer.GetAllReportedAnswer({
        search: '',
        skip: 0,
        take: 100,
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
      }
    },
  },
  getters: {},
}

export default Answer
