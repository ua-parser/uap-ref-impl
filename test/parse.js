const assert = require('assert')
const parser = require('..')

const USER_AGENT_STRING = 'Mozilla/5.0 (Windows NT 6.1; rv:2.0b6pre) Gecko/20100903 Firefox/4.0b6pre Firefox/4.0b6pre'

const regexes = {
  user_agent_parsers: [
    { regex: '(Firefox)/(\\d+)(?:\\.(\\d+)|)' }
  ],
  os_parsers: [
    { regex: '(Windows NT) (\\d+)(?:\\.(\\d+)|)' }
  ],
  device_parsers: [
    {
      regex: 'Windows NT',
      device_replacement: 'Desktop'
    }
  ]
}

describe('parse function', function () {
  it('shall parse user agent string', function () {
    const parse = parser(regexes).parse
    const result = parse(USER_AGENT_STRING)
    assert.deepStrictEqual(
      JSON.parse(JSON.stringify(result)), {
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:2.0b6pre) Gecko/20100903 Firefox/4.0b6pre Firefox/4.0b6pre',
        ua: {
          family: 'Firefox',
          major: '4',
          minor: '0',
          patch: null
        },
        os:
         {
           family: 'Windows NT',
           major: '6',
           minor: '1',
           patch: null,
           patchMinor: null
         },
        device: { family: 'Desktop', brand: null, model: null }
      }
    )
  })
})
