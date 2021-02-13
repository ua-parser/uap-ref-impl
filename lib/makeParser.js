module.exports = function makeParser (regexes, parserMaker, defaultObjMaker) {
  const parsers = regexes.map(parserMaker)

  function parser (str) {
    let obj

    if (typeof str === 'string') {
      for (let i = 0, length = parsers.length; i < length; i++) {
        obj = parsers[i](str)
        if (obj) { return obj }
      }
    }

    return defaultObjMaker()
  }

  return parser
}
