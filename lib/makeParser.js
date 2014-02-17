module.exports = function makeParser(regexes, parserMaker, defaultObjMaker) {
  var parsers = regexes.map(parserMaker)

  function parser(str) {
      var obj;
      
      if (typeof str === 'string') {
          for (var i = 0, length = parsers.length; i < length; i++) {
              obj = parsers[i](str);
              if (obj) { return obj; }
          }
      }
      
      return defaultObjMaker();
  }

  return parser;
}