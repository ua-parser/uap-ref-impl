const assert = require('assert')
const makeParser = require('../lib/ua').makeParser

describe('UA parser', function () {
  it('makeParser returns a function', function () {
    assert.strictEqual(typeof makeParser({}), 'function')
  })

  it('Parser returns family "undefined" when no match is found', function () {
    const parse = makeParser({})
    assert.deepStrictEqual(parse('foo'), {
      family: undefined,
      major: null,
      minor: null,
      patch: null,
      userAgent: 'foo'
    })
  })

  it('Parser correctly identifies UA name', function () {
    const parse = makeParser({ regex: '(foo)' })
    assert.strictEqual(parse('foo').family, 'foo')
  })

  it('Parser correctly identifies version numbers', function () {
    const parse = makeParser({ regex: '(foo) (\\d)\\.(\\d)\\.(\\d)' })
    const ua = parse('foo 1.2.3')
    assert.strictEqual(ua.family, 'foo')
    assert.strictEqual(ua.major, '1')
    assert.strictEqual(ua.minor, '2')
    assert.strictEqual(ua.patch, '3')
  })

  it('Parser correctly processes replacements', function () {
    const parse = makeParser({
      regex: '(foo) (\\d)\\.(\\d).(\\d)',
      family_replacement: '$1bar',
      v1_replacement: 'a',
      v2_replacement: 'b',
      v3_replacement: 'c'
    })

    const ua = parse('foo 1.2.3')
    assert.strictEqual(ua.family, 'foobar')
    assert.strictEqual(ua.major, 'a')
    assert.strictEqual(ua.minor, 'b')
    assert.strictEqual(ua.patch, 'c')
  })
})
