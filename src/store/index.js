import Vuex from 'vuex'
import categoryModule from './Category'
import userModule from './User'
import productModule from './Product'

const store = new Vuex.Store({
  modules: {
    category: categoryModule,
    user: userModule,
    product: productModule,
  },
})
export default store
