import * as types from '../mutation-types'

const state = {
  upstreamCustomers: []
}

const getters = {
  upstreamCustomers: state => state.upstreamCustomers,
  hasUpstream: (state, getters) => {
    try {
      return getters.demoBaseConfig.multichannel.includes('upstream')
    } catch (e) {
      return false
    }
  }
}

const mutations = {
  [types.SET_UPSTREAM_CUSTOMERS] (state, data) {
    state.upstreamCustomers = data
  }
}

const actions = {
  async getUpstreamCustomers ({getters, dispatch}) {
    dispatch('fetch', {
      group: 'upstream',
      type: 'customer',
      url: getters.endpoints.upstream.customer,
      mutation: types.SET_UPSTREAM_CUSTOMERS,
      message: 'get Upstream customers list'
    })
  },
  async setUpstreamVertical ({getters, dispatch}, {data}) {
    dispatch('fetch', {
      group: 'upstream',
      type: 'customer',
      url: getters.endpoints.upstream.customer + '/' + data.contactId,
      options: {
        method: 'POST',
        body: data
      },
      mutation: types.SET_UPSTREAM_CUSTOMERS,
      message: `set Upstream customer's vertical`
    })
  },
  async createUpstreamCustomer ({getters, dispatch}, data) {
    dispatch('fetch', {
      group: 'upstream',
      type: 'customer',
      url: getters.endpoints.upstream.customer,
      options: {
        method: 'POST',
        body: data
      },
      mutation: types.SET_UPSTREAM_CUSTOMERS,
      message: 'Create Upstream customer',
      showNotification: true
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
