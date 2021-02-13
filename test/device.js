var assert = require('assert'),
    makeParser = require('../lib/device').makeParser;

describe('Device parser', function() {
  it('makeParser returns a function', function() {
    assert.equal(typeof makeParser({}), 'function');
  });

  it('Parser returns family "Other" when no match is found', function() {
    var parse = makeParser({})
    assert.deepStrictEqual(parse('foo'), {
      family: 'Other',
      brand: null,
      model: null,
      userAgent: 'foo'
    });
  });

  it('Parser correctly identifies Device name', function() {
    var parse = makeParser({regex: '(foo)'});
    assert.strictEqual(parse('foo').family, 'foo');
  });

  it('Parser correctly processes replacements', function() {
    var parse = makeParser({
      regex: '(foo)(bar)',
      device_replacement: '$1bar',
      brand_replacement: '$2',
      model_replacement: '$1'
    });

    var device = parse('foobar');
    assert.strictEqual(device.family, 'foobar');
    assert.strictEqual(device.brand, 'bar');
    assert.strictEqual(device.model, 'foo');
  });
});
