import product from './../apis/product'

const Product = {
  state: {
    product: [],
    totalRecord: 0
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
  },
  actions: {
    async getAllProduct({ commit }, { skip, take }) {
      console.log(skip, take);
      const response = await product.getAllReportedProduct({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {
        console.log(response);
        // let data = []
        // for (const element of response.data) {
        //   data.push({
        //     id: element.id,
        //     product: element.productname,
        //     name: element.name,
        //     category: element.categoryName,
        //     isDisable: element.isDisable,
        //   })
        // }
        commit('setProduct', response.data)
        commit('setTotalRecord', response.total)

      }
    },
  },
  getters: {},
}

export default Product
