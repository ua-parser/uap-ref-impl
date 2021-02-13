exports.makeDefault = function makeDefault (str) {
  return {
    userAgent: str,
    family: 'Other',
    major: null,
    minor: null,
    patch: null
  }
}

exports.makeParser = function makeParser (obj) {
  const regexp = new RegExp(obj.regex)
  const famRep = obj.family_replacement
  const majorRep = obj.v1_replacement
  const minorRep = obj.v2_replacement
  const patchRep = obj.v3_replacement

  function parser (str) {
    const m = str.match(regexp)
    if (!m) { return null }

    return {
      userAgent: str,
      family: famRep ? famRep.replace('$1', m[1]) : m[1],
      major: majorRep || m[2] || null,
      minor: minorRep || m[3] || null,
      patch: patchRep || m[4] || null
    }
  }

  return parser
}
