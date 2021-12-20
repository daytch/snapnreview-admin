import question from './../apis/question'

const Question = {
  state: {
    question: [],
    totalRecord: 0
  },
  mutations: {
    setQuestion(state, payload) {
      state.question = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
  },
  actions: {
    async getAllQuestion({ commit }, {skip,take}) {
      const response = await question.getAllReportedQuestion({
        search: '',
        skip: skip,
        take: take,
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
        commit('setTotalRecord', response.total)
      }
    },
  },
  getters: {},
}

export default Question
