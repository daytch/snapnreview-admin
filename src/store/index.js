import { createStore } from 'vuex'
import user from './../apis/user'
import router from '../router'

export default createStore({
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
  },
  actions: {
    async loginAction({ state, commit }) {
      const response = await user.login({
        email: state.username,
        password: state.password,
      })
      localStorage.setItem('token', response.token)
      console.log(response)
      commit('setUser', response)
      commit('setToken', response.token)
      router.push('/')
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
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  modules: {},
})
