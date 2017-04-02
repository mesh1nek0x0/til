'use strict';

var Promise = require('bluebird')

module.exports = class Model{
  promiseAdd(a, b){
    return new Promise((resolve, reject) => {
      resolve(a + b);
    });
  }
};
