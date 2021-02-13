const replaceMatches = require('./replaceMatches')

exports.makeDefault = function makeDefault (str) {
  return {
    userAgent: str,
    family: 'Other',
    major: null,
    minor: null,
    patch: null,
    patchMinor: null
  }
}

exports.makeParser = function makeParser (obj) {
  const regexp = new RegExp(obj.regex)
  const famRep = obj.os_replacement
  const majorRep = obj.os_v1_replacement
  const minorRep = obj.os_v2_replacement
  const patchRep = obj.os_v3_replacement
  const patchMinorRep = obj.os_v4_replacement

  function parser (str) {
    const m = str.match(regexp)
    if (!m) { return null }

    return {
      userAgent: str,
      family: (famRep ? replaceMatches(famRep, m) : m[1]) || 'Other',
      major: (majorRep ? replaceMatches(majorRep, m) : m[2]) || null,
      minor: (minorRep ? replaceMatches(minorRep, m) : m[3]) || null,
      patch: (patchRep ? replaceMatches(patchRep, m) : m[4]) || null,
      patchMinor: (patchMinorRep ? replaceMatches(patchMinorRep, m) : m[5]) || null
    }
  }

  return parser
}
