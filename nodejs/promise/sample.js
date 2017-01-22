'use strinct';

var promise = new Promise(function(resolve) {
  resolve('hoge');
});

promise.then(function(value) {
  console.log(value);
}).catch(function(error) {
  console.error(error);
});