import { createStore } from 'vuex'

export default createStore({
  state: {
    siteCode: ''
  },
  mutations: {
    setSiteCode(state, value) {
      state.siteCode = value
    }
  },
  actions: {
    getSiteCode(state) {
      return state.siteCode
    }
  }
})
