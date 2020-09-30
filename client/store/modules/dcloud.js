const getters = {
  demoPlatform: (state, getters) => getters.demoConfig.demo,
  demoVersion: (state, getters) => getters.demoConfig.version,
  hasSalesforce: (state, getters) => {
    // returns true if this demo has SFDC capabilities
    // must be PCCE and version >= 12.5v2
    return getters.demoPlatform === 'pcce' && getters.demoVersion === '12.5v2'
  },
  hasServiceNow: (state, getters) => {
    // returns true if this demo has ServiceNow capabilities
    // must be PCCE and version >= 12.5v2
    return getters.demoPlatform === 'pcce' && getters.demoVersion === '12.5v2'
  },
  hasMsDynamics: (state, getters) => {
    // returns true if this demo has Microsoft Dynamics capabilities
    // must be PCCE and version >= 12.5v2
    return getters.demoPlatform === 'pcce' && getters.demoVersion === '12.5v2'
  }
}

export default {
  getters
}
