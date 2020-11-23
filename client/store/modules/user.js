import * as types from '../mutation-types'

function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

const state = {
  jwt: null
}

const getters = {
  // decoded JWT
  jwtUser: state => {
    try {
      return parseJwt(state.jwt)
    } catch (e) {
      return {}
    }
  },
  // encoded JWT from server
  jwt: state => state.jwt
}

const mutations = {
  [types.SET_JWT] (state, data) {
    state.jwt = data
  }
}

const actions = {
  setJwt ({commit}, data) {
    // set JWT in state
    commit(types.SET_JWT, data)
    // set authToken in localStorage also
    window.localStorage.setItem('jwt', data)
  },
  unsetJwt ({commit}) {
    // unset JWT in state
    commit(types.SET_JWT, null)
    // remove JWT from localStorage
    window.localStorage.removeItem('jwt')
  },
  async login ({dispatch, getters}, body) {
    dispatch('fetch', {
      group: 'user',
      type: 'login',
      url: getters.endpoints.login,
      options: {
        method: 'POST',
        body
      },
      message: 'log in',
      mutation: types.SET_JWT
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
