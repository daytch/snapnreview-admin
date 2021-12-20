import user from './../apis/user'
import router from '../router'

const User = {
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    token: localStorage.getItem('token') || '',
    status: '',
    password: '',
    username: '',
    user: {
      email: '',
      name: '',
      image: '',
      roles: [],
      token: '',
    },
    users: [],
    userTotal: 0,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setPassword(state, payload) {
      state.password = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    setUsers(state, payload) {
      state.users = payload
    },
    setTotal(state, payload) {
      state.userTotal = payload
    }
  },
  actions: {
    async loginAction({ state, commit }) {
      let response = await user.login({
        email: state.username,
        password: state.password,
      })

      if (response.isSuccess) {
        localStorage.setItem('token', response.token)
        console.log(response)
        commit('setUser', response)
        commit('setToken', response.token)
        router.push('/')
      }else{
        console.log(response.message)
        throw new Error(response.message)
      }

    },
    logoutAction({ commit }) {
      localStorage.removeItem('token')
      commit('setToken', '')
      commit('setUser', {
        email: '',
        name: '',
        image: '',
        roles: [],
        token: '',
      })
      router.push('/pages/login')
    },
    async getAllUser({ commit }, { skip, take }) {
      const response = await user.getAllUser({
        search: '',
        skip: skip,
        take: take,
      })
      if (response.isSuccess) {
        // let data = []
        // for (const elm of response.data) {
        //   data.push({
        //     reviewId: elm.reviewId,
        //     reviewDescription: elm.reviewDescription,
        //     productName: elm.productName,
        //     categoryName: elm.categoryName,
        //     name: elm.name,
        //     answerDescription: elm.answerDescription,
        //     isDisable: elm.isDisable,
        //   })
        // }
        await commit('setUsers', response.data)
        await commit('setTotal', response.total)
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
}

export default User
