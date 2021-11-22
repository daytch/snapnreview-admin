import question from './../apis/question'

const Question = {
  state: {
    question: [],
  },
  mutations: {
    setQuestion(state, payload) {
      state.question = payload
    },
  },
  actions: {
    async getAllQuestion({ commit }) {
      const response = await question.getAllReportedQuestion({
        search: '',
        skip: 0,
        take: 100,
      })
      if (response.isSuccess) {
        let data = []
        for (const elm of response.data) {
          data.push({
            questionId: elm.questionId,
            title: elm.title,
            questionDescription: elm.questionDescription,
            category: elm.categoryName,
            name: elm.name,
            isDisable: elm.isDisabled,
          })
        }
        commit('setQuestion', data)
      }
    },
  },
  getters: {},
}

export default Question
