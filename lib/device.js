exports.makeDefault = function makeDefault(str) {
    return {
        userAgent: str,
        family: "Other"
    };
};

exports.makeParser = function makeParser(obj) {
  var regexp = new RegExp(obj.regex),
      deviceRep = obj.device_replacement;

  function parser(str) {
    var m = str.match(regexp);
    if (!m) { return null; }
    
    return {
        userAgent: str,
        family: deviceRep ? deviceRep.replace('$1', m[1]) : m[1]
    };
  }

  return parser;
};
