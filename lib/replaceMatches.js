module.exports = function replaceMatches (str, m) {
  return str.replace(/\$(\d)/g, function (tmp, i) {
    return m[i] || ''
  }).trim()
}
