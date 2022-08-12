import appState from 'lib/appState'

const state = {
  app: appState
}

const getters = {
  globalState () {
    return state.app
  }
}

const mutations = {
  toggleMiniCart (state) {
    state.app.isMiniCartOpen = !state.app.isMiniCartOpen
  }
}

const actions = {
  toggleMiniCart ({ commit }) {
    commit('toggleMiniCart')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
