function parseVersion (version) {
  // parse demo version into parts
  try {
    const matches =  version.match(/^(\d{2})\.(\d)(v\d|\w*)/)
    return {
      // the original version string
      full: matches[0],
      // major version integer
      major: parseInt(matches[1]),
      // minor version integer
      minor: parseInt(matches[2]),
      // revision integer
      revision: parseInt(matches[4]),
      // revisions like "EFT"
      other: matches[5]
    }
  } catch (e) {
    console.log('could not parse demo version into parts:', e.message)
  }
}

function versionSort (a, b) {
  if (a.major === b.major) {
    if (a.minor === b.minor) {
      if (a.other && !b.other) {
        // a is something like EFT, so it is lower than any revision numbers
        return -1
      } else if (!a.other && b.other) {
        // b is something like EFT, so it is lower than any revision numbers
        return 1
      } else if (a.other && b.other) {
        // sort strings alphabetically
        return a.other - b.other
      } else {
        // a and b have revision numbers instead of strings
        return a.revision - b.revision
      }
    } else {
      // a.minor !== b.minor
      return a.minor - b.minor
    }
  } else {
    // a.major !== b.major
    return a.major - b.major
  }
}


const getters = {
  demoPlatform: (state, getters) => getters.demoConfig.demo,
  demoVersion: (state, getters) => parseVersion(getters.demoConfig.version),
  hasSfdc: (state, getters) => {
    // returns true if this demo has SFDC capabilities
    const version = getters.demoVersion
    // minimum PCCE version for SFDC is 12.5v2
    const minimum = parseVersion('12.5v2')
    // must be PCCE
    return getters.demoPlatform === 'pcce' &&
    // and version >= 12.5v2
    versionSort(version, minimum) >= 0
  }
}

export default {
  getters
}
