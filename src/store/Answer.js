import answer from './../apis/answer'

const Answer = {
  state: {
    answer: [],
    totalRecord: 0,
    answerDetail: null
  },
  mutations: {
    setAnswer(state, payload) {
      state.answer = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
    setAnswerDetail(state, payload) {
      state.answerDetail = payload
    }
  },
  actions: {
    async getAllAnswer({ commit }, { skip, take }) {
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
    async getAnswerById({ commit }, { questionAnswerId }) {
      const response = await answer.GetAllReportedAnswer({
        search: '',
        skip: 0,
        take: 1,
        questionAnswerId
      })
      if (response.isSuccess) {

        commit('setAnswerDetail', response.data[0])
      } else {
        commit('setAnswerDetail', null)
      }
    }
  },
  getters: {},
}

export default Answer
