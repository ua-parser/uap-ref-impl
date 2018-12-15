var assert = require('assert'),
    makeParser = require('../lib/os').makeParser;

describe('OS parser', function() {
  it('makeParser returns a function', function() {
    assert.equal(typeof makeParser({}), 'function');
  });

  it('Parser returns family "Other" when no match is found', function() {
    var parse = makeParser({})
    assert.deepStrictEqual(parse('foo'), {
      family: 'Other',
      major: null,
      minor: null,
      patch: null,
      patchMinor: null,
      userAgent: 'foo'
    });
  });

  it('Parser correctly identifies OS name', function() {
    var parse = makeParser({regex: '(foo)'});
    assert.strictEqual(parse('foo').family, 'foo');
  });

  it('Parser correctly identifies version numbers', function() {
    var parse = makeParser({regex: '(foo) (\\d)\\.(\\d).(\\d)\\.(\\d)'}),
        os = parse('foo 1.2.3.4');
    assert.strictEqual(os.family, 'foo');
    assert.strictEqual(os.major, '1');
    assert.strictEqual(os.minor, '2');
    assert.strictEqual(os.patch, '3');
    assert.strictEqual(os.patchMinor, '4');
  });

  it('Parser correctly processes replacements', function() {
    var parse = makeParser({
      regex: '(foo) (\\d)\\.(\\d)\\.(\\d)\\.(\\d)',
      os_replacement: '$1bar',
      os_v1_replacement: 'a',
      os_v2_replacement: 'b',
      os_v3_replacement: 'c',
      os_v4_replacement: 'd'
    });

    var os = parse('foo 1.2.3.4');
    assert.strictEqual(os.family, 'foobar');
    assert.strictEqual(os.major, 'a');
    assert.strictEqual(os.minor, 'b');
    assert.strictEqual(os.patch, 'c');
  });
});
