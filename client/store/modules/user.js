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
  isLoggedIn: (state, getters) => {
    try {
      return typeof getters.jwtUser.email === 'string'
    } catch (e) {
      return false
    }
  },
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
  logout ({dispatch}) {
    dispatch('unsetJwt')
  },
  checkLogin ({dispatch}) {
    const jwt = window.localStorage.getItem('jwt')
    if (jwt) {
      dispatch('setJwt', jwt)
    }
  },
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
    const response = await dispatch('fetch', {
      group: 'user',
      type: 'login',
      url: getters.endpoints.login,
      options: {
        method: 'POST',
        body
      },
      message: 'log in'
    })
    dispatch('setJwt', response.jwt)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
