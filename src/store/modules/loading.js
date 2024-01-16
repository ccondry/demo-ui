import * as types from '../mutation-types'

const state = {
  loading: {
    app: {},
    demo: {},
    multichannel: {},
    session: {},
    upstream: {},
    vertical: {}
  }
}

const getters = {
  loading: state => state.loading
}

const mutations = {
  [types.SET_LOADING] (state, data) {
    // if state container for this group is not existing, create it
    if (!state.loading[data.group]) {
      state.loading[data.group] = {}
    }

    // if state container for this type is not existing, create it
    state.loading[data.group][data.type] = data.value
  }
}

const actions = {
  setLoading ({commit}, {group, type, value = true}) {
    commit(types.SET_LOADING, {group, type, value})
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
