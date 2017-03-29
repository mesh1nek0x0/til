const sinon = require('sinon');
const assert = require('assert');

function throttle(callback) {
  var timer;
  return function () {
    clearTimeout(timer);
    var args = [].slice.call(arguments);
    timer = setTimeout(function () {
      callback.apply(this, args);
    }, 100);
  }
}

var clock;

before(function () {
  clock = sinon.useFakeTimers();
});

after(function () {
  clock.restore();
});

it('calls callback afeter 100ms', function () {
  var callback = sinon.spy();
  var throttled = throttle(callback);
  
  throttled();
  
  clock.tick(99);
  assert(callback.notCalled);
  
  clock.tick(1);
  assert(callback.calledOnce);
});