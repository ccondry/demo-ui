import * as types from '../mutation-types'
import { Toast } from 'buefy'

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
  async getUpstreamCustomers ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'upstream', type: 'customer', value: true})
    try {
      await dispatch('loadToState', {
        name: `get Upstream customers list`,
        endpoint: getters.endpoints.upstream.customer,
        mutation: types.SET_UPSTREAM_CUSTOMERS,
        showNotification
      })
    } catch (e) {
      console.log('error getting upstream customers', e)
      // dispatch('errorNotification', {title: 'Failed to create Upstream customer', error: e})
      Toast.open({
        duration: 5000,
        message: `get Upstream customers list failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setLoading', {group: 'upstream', type: 'customer', value: false})
    }
  },
  async setUpstreamVertical ({getters, commit, dispatch}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'upstream', type: 'customer', value: true})
    try {
      await dispatch('postData', {
        name: `set Upstream customer's vertical`,
        endpoint: getters.endpoints.upstream.customer + '/' + data.contactId,
        data,
        showNotification
      })
    } catch (e) {
      console.log('error saving upstream customer\'s vertical', e)
      // dispatch('errorNotification', {title: 'Failed to create Upstream customer', error: e})
      Toast.open({
        duration: 5000,
        message: `set Upstream customer's vertical failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'upstream', type: 'customer', value: false})
    }
  },
  async createUpstreamCustomer ({getters, commit, dispatch}, {data, showNotification = true}) {
    dispatch('setWorking', {group: 'upstream', type: 'customer', value: true})
    try {
      await dispatch('postData', {
        name: 'Create Upstream customer',
        endpoint: getters.endpoints.upstream.customer,
        data,
        showNotification
      })
    } catch (e) {
      console.log('error saving demo session config', e)
      // dispatch('errorNotification', {title: 'Failed to create Upstream customer', error: e})
      Toast.open({
        duration: 5000,
        message: `Create Upstream customer failed`,
        // position: 'is-bottom',
        type: 'is-danger'
      })
    } finally {
      dispatch('setWorking', {group: 'upstream', type: 'customer', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
