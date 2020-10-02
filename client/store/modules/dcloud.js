const getters = {
  demoPlatform: (state, getters) => getters.demoConfig.demo,
  demoVersion: (state, getters) => getters.demoConfig.version,
  multichannelOptions (state, getters) {
    try {
      return getters.demoBaseConfig.multichannel
    } catch (e) {
      return []
    }
  },
  hasMultichannel (state, getters) {
    try {
      return getters.multichannelOptions.length > 0
    } catch (e) {
      return false
    }
  }
}

export default {
  getters
}
