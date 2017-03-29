const sinon = require('sinon');
const assert = require('assert');
const once = require('once');

describe('stub test sample', function () {
  it('retunrs the return integer value from the original function', function () {
    var callback = sinon.stub().returns(42);
    var proxy = once(callback);
    assert.equal(proxy(), 42);
  });
  
  it('retunrs the return string value from the original function', function () {
    var callback = sinon.stub().returns('hoge');
    var proxy = once(callback);
    assert.equal(proxy(), 'hoge');
  });
});