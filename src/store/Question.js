import question from './../apis/question'

const Question = {
  state: {
    question: [],
    questionDetail: null,
    totalRecord: 0
  },
  mutations: {
    setQuestion(state, payload) {
      state.question = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
    setQuestionDetail(state, payload){
      state.questionDetail = payload
    }
  },
  actions: {
    async getAllQuestion({ commit }, { skip, take }) {
      const response = await question.getAllReportedQuestion({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {
        // let data = []
        // for (const elm of response.data) {
        //   data.push({
        //     questionId: elm.questionId,
        //     title: elm.title,
        //     questionDescription: elm.questionDescription,
        //     category: elm.categoryName,
        //     name: elm.name,
        //     isDisable: elm.isDisabled,
        //   })
        // }
        commit('setQuestion', response.data)
        commit('setTotalRecord', response.total)
      }
    },
    async getQuestionDetail({ commit }, { questionId }) {
      const response = await question.getAllReportedQuestion({
        search: "",
        skip: 0,
        take: 1,
        questionId
      })
      if (response.isSuccess) {
        commit('setQuestionDetail', response.data[0])

      }
      else {
        commit('setQuestionDetail', null)
      }
    }
  },
  getters: {},
}

export default Question
