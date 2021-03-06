import product from './../apis/product'

const Product = {
  state: {
    product: [],
    totalRecord: 0,
    productDetail: null,
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
    setProductDetail(state, payload) {
      state.productDetail = payload
    },
  },
  actions: {
    async getAllProduct({ commit }, { skip, take }) {
      console.log(skip, take)
      const response = await product.getAllReportedProduct({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {
        console.log(response)
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
    async getProductById({ commit }, { id }) {
      const response = await product.getProductById({
        id: id,
      })
      if (response.isSuccess) {
        console.log(response.data[0])
        if(response.data.length>0){
          commit('setProductDetail', response.data[0])
        }
        
      }
    }
  },
  getters: {},
}

export default Product
