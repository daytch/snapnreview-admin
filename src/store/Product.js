import product from './../apis/product'

const Product = {
  state: {
    product: [],
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload
    },
  },
  actions: {
    async getAllProduct({ commit }) {
      const response = await product.getAllReportedProduct({
        search: '',
        skip: 0,
        take: 100,
      })
      if (response.isSuccess) {
        let data = []
        for (const element of response.data) {
          data.push({
            id: element.id,
            product: element.productname,
            name: element.name,
            category: element.categoryName,
            isDisable: element.isDisable,
          })
        }
        commit('setProduct', data)
      }
    },
  },
  getters: {},
}

export default Product
