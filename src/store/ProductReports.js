import productReports from '../apis/productReports'

const ProductReport = {
  state: {
    productReports: [],
    totalRecord: 0,
    productReportDetail: null,
  },
  mutations: {
    setProductReport(state, payload) {
      state.productReports = payload
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload
    },
    setProductReportDetail(state, payload) {
      state.productReportDetail = payload
    },
  },
  actions: {
    async getAllProduct({ commit }, { skip, take }) {
      console.log(skip, take)
      const response = await productReports.getAllProductRepots({
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
        commit('setProductReport', response.data)
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
          commit('setProductReportDetail', response.data[0])
        }
        
      }
    }
  },
  getters: {},
}

export default Product
