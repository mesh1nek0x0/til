'use strict';

var assert = require('assert');
var Model = require('../model.js');
const sinon = require('sinon');

describe('resolve', () => {
  let target;

  before(() => {
    target = new Model();
  });

  it('with done & catch', (done) => {
    target.promiseAdd(1, 1).then((result) => {
      assert.equal(result, 2);
      assert.equal(result, 'ちゃんとAssertionErrorになる!!!');
      done();
    }).catch((e) => {
      // AssertionError用のcatchしておかないと
      // Timeout発生でなにで落ちたかわからない
      // catchしておくことでテストは意図通り失敗するが、expectedがなにで、actualは明記なし
      // AssertionError: 2 == 'ちゃんとAssertionErrorになる!!!'
      done(e);
    });
  });

  it('without done & catch', () => {
    return target.promiseAdd(1, 1).then((result) => {
      assert.equal(result, 2);
      assert.equal(result, 'ちゃんとAssertionErrorになる!!!');
    });
    // テストは意図通り失敗するが、expectedがなにで、actualは明記なし
    // AssertionError: 2 == 'ちゃんとAssertionErrorになる!!!'だけが表示される
  });
});

describe('reject', () => {
  let target;
  let stub;

  before(() => {
    target = new Model();
  });

  afterEach(() => {
    stub.restore();
  });

  it('with done & catch', (done) => {
    stub = sinon.stub(target, 'promiseAdd').returns(Promise.reject('hoge error!!!'));
    target.promiseAdd(1, 1).catch((error) => {
      assert.equal(error, 'hoge error!!!');
      // 以下でちゃんとAssertionErrorが発生する
      assert.equal(error, 'ちゃんとAssertionErrorになる!!!');
      done();
    }).catch((e) => {
      // AssertionError用のcatchしておかないと
      // Timeout発生でなにで落ちたかわからない
      // テストは意図通り失敗し、expectedがなにで、actualも明記される。理想的!
      done(e);
    });
  });

  it.only('without done & catch', () => {
    stub = sinon.stub(target, 'promiseAdd').returns(Promise.reject('hoge error!!!'));
    return target.promiseAdd(1, 1).catch((error) => {
      assert.equal(error, 'hoge error!!!');
      // 以下でちゃんとAssertionErrorが発生するし、テストは意図通り失敗し、expectedがなにで、actualも明記される。理想的!
      assert.equal(error, 'ちゃんとAssertionErrorになる!!!');
    });
  });

  it.only('without done & catch and use promise-test-helper', () => {
    stub = sinon.stub(target, 'promiseAdd').returns(Promise.reject('hoge error!!!'));
    return target.promiseAdd(1, 1).catch((error) => {
      assert.equal(error, 'hoge error!!!');
      // 以下でちゃんとAssertionErrorが発生するし、テストは意図通り失敗し、expectedがなにで、actualも明記される。理想的!
      assert.equal(error, 'ちゃんとAssertionErrorになる!!!');
    });
  });
});
