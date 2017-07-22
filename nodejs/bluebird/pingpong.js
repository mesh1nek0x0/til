'use strict';

const Promise = require('bluebird');

function PingPong() {}

PingPong.prototype.ping = Promise.coroutine(function* (val) {
    console.log('ping?', val);
    yield Promise.delay(1000);
    this.pong(val+1);
});

PingPong.prototype.pong = Promise.coroutine(function* (val) {
    console.log('pong!', val);
    yield Promise.delay(500);
    this.ping(val+1);
});

var a = new PingPong();
a.ping(0);
