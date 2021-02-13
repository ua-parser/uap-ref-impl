const replaceMatches = require('./replaceMatches')

exports.makeDefault = function makeDefault (str) {
  return {
    userAgent: str,
    family: 'Other',
    brand: null,
    model: null
  }
}

exports.makeParser = function makeParser (obj) {
  const regexp = new RegExp(obj.regex, obj.regex_flag || '')
  const deviceRep = obj.device_replacement
  const brandRep = obj.brand_replacement
  const modelRep = obj.model_replacement

  function parser (str) {
    const m = str.match(regexp)
    if (!m) { return null }

    return {
      userAgent: str,
      family: (deviceRep ? replaceMatches(deviceRep, m) : m[1]) || 'Other',
      brand: (brandRep ? replaceMatches(brandRep, m) : null) || null,
      model: (modelRep ? replaceMatches(modelRep, m) : m[1]) || null
    }
  }

  return parser
}
