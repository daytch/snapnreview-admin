import category from './../apis/category'

const Category = {
  state: {
    parentCategory: [{ id: 0, text: '', iconUrl: '', sub: [] }],
    childCategory: [{ id: 0, text: '', iconUrl: '', parentCategoryId: 0 }],
    dropdown: [],
  },
  mutations: {
    setParentCategory(state, parentCategory) {
      state.parentCategory = parentCategory
    },
    setChildCategory(state, childCategory) {
      state.childCategory = childCategory
    },
    setDropdown(state, dropdown) {
      state.dropdown = dropdown
    },
  },
  actions: {
    async getParentCategory({ state, commit }) {
      const response = await category.getAllParentCategory()
      if (response.isSuccess) {
        let parentData = response.data
        let childData = state.childCategory
        let dp = []
        for (const element of parentData) {
          dp.push({
            label: element.text,
            value: element.id,
          })
          element.sub = childData.filter(
            (item) => item.parentCategoryId === element.id,
          )
        }
        commit('setDropdown', dp)
        commit('setParentCategory', parentData)
      }
    },
    async getChildCategory({ commit }) {
      const response = await category.getAllSubCategory()
      if (response.isSuccess) {
        commit('setChildCategory', response.data)
      }
    },
  },
  getters: {
    getParentCategory: (state) => state.parentCategory,
    getChildCategory: (state) => state.childCategory,
    getDropdown: (state) => state.dropdown,
  },
}

export default Category
