function parseVersion (version) {
  if (!version) {
    return {}
  }
  // parse demo version into parts
  try {
    const matches = version.match(/^[[(\d{2})\.(\d)]|\w](v(\d)|(\w*))/)
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
    console.log('could not parse demo version "' + version + '" into parts:', e.message)
  }
}

console.log(parseVersion('12.5v1'))
console.log(parseVersion('wxccev1'))
console.log(parseVersion('wxccev2'))