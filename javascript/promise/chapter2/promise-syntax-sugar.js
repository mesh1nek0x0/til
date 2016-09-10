Promise.resolve(42).then(function (value) {
  console.log(value);
});

Promise.reject(new Error("BOOOOOOOOM")).catch(function (error) {
  console.error(error);
});


var promise = new Promise(function (resolve) {
  console.log('inner promise'); // 1番目に実行される
  resolve(42);
});

promise.then(function (value) {
  console.log(valur); // 3番目に実行される
});

console.log('outer promise'); // ２番目に実行される
