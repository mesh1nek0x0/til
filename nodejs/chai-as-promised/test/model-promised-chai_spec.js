'use strict';

var chai = require('chai');
var chaiAsProised = require('chai-as-promised');
var Model = require('../model.js')
const sinon = require('sinon');

chai.use(chaiAsProised);
var assert = chai.assert;

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
      // AssertionError用のcatchしておかないと、Timeoutとunhandled Rejctionが発生する
      // 意図通りtestが失敗して、expectedとatualもわかります
      done(e);
    });
  });

  it('without done & catch', () => {
    return target.promiseAdd(1, 1).then((result) => {
      assert.equal(result, 2);
      // 以下で意図通りtestが失敗して、expectedとatualもわかります
      assert.equal(result, 'ちゃんとAssertionErrorになる!!!');
    });
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
      assert.equal(error, 'ちゃんとAssertionErrorになる!!!');
      done();
    }).catch((e) => {
      // AssertionError用のcatchがないとTimeoutでなにが起きたかわからない
      // catchしておくことで意図通り失敗して、expectedとactualもわかる
      done(e);
    });
  });

  it.only('without done & catch', () => {
    stub = sinon.stub(target, 'promiseAdd').returns(Promise.reject('hoge error!!!'));
    return target.promiseAdd(1, 1).catch((error) => {
      assert.equal(error, 'hoge error!!!');
      // 以下でちゃんとAssertionErrorが発生するし、テストは意図通り失敗し、expectedがなにで、actualも明記される。
      assert.equal(error, 'ちゃんとAssertionErrorになる!!!');
    });
  });
});
