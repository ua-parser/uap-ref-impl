exports.makeDefault = function makeDefault(str) {
    return {
        userAgent: str,
        family: "Other",
        major: null,
        minor: null,
        patch: null
    };
}

exports.makeParser = function makeParser(obj) {
  var regexp = new RegExp(obj.regex),
      famRep = obj.family_replacement,
      majorRep = obj.v1_replacement,
      minorRep = obj.v2_replacement,
      patchRep = obj.v3_replacement;

  function parser(str) {
    var m = str.match(regexp);
    if (!m) { return null; }
    
    return {
        userAgent: str,
        family: famRep ? famRep.replace('$1', m[1]) : m[1],
        major: majorRep || m[2] || null,
        minor: minorRep || m[3] || null,
        patch: patchRep || m[4] || null
    };
  }

  return parser;
}
