const sinon = require('sinon');
const assert = require('assert');
const once = require('once');

describe('spy test sample', function () {
  it('calls the original function', function () {
    var callback = sinon.spy();
    var proxy = once(callback);
    
    proxy();
    
    assert(callback.called);
  });
  
  it('calls the original function', function () {
    var callback = sinon.spy();
    var proxy = once(callback);
    
    proxy();
    proxy();
    
    assert(callback.callCount, 2);
  });
  
  it('calls riginal function with right this and args', function () {
    var callback = sinon.spy();
    var proxy = once(callback);
    var obj = {};
    
    proxy.call(obj, 1, 2, 3);
    
    assert(callback.calledOn(obj));
    assert(callback.calledWith(1, 2, 3));
  });
  
});