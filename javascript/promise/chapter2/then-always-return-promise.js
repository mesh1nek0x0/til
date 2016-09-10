var aPromise = Promise.resolve(100);
var thenPromise = aPromise.then(function (value) {
  console.log(value);
});
var catchPromise = thenPromise.catch(function (error) {
  console.error(error);
});
console.log(aPromise !== thenPromise);
console.log(thenPromise !== catchPromise);
