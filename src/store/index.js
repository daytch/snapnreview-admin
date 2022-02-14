import Vuex from 'vuex'
import categoryModule from './Category'
import userModule from './User'
import productModule from './Product'
import reviewModule from './Review'
import commentModule from './Comment'
import questionModule from './Question'
import answerModule from './Answer'
import sharedModule from './Shared'
import questionCommentModule from './QuestionComment'

const store = new Vuex.Store({
  modules: {
    category: categoryModule,
    user: userModule,
    product: productModule,
    review: reviewModule,
    comment: commentModule,
    question: questionModule,
    answer: answerModule,
    shared: sharedModule,
    questionComment : questionCommentModule
  },
})
export default store
