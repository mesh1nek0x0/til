const XMLHttpRequest = require('XMLHttpRequest').XMLHttpRequest;
function getURL(URL) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        console.log("status ok");
        resolve(req.responseText);
      } else {
        reject(new Error(req.status));
      }
    };
    req.onerror = function () {
      reject(new Error(req.status));
    };
    req.send();
  });
}

var URL = "http://httpbin.org/get/hoge";
getURL(URL).then(function onFulfilled(value) { // わかりやすさのためのonFulfilledと命名
  console.log("fulfilled...");
  console.log(value);
}).catch(function onRejected(error) { // わかりやすさのためのonRejectedと命名 
  console.log("rejected...");
  console.log(error);
});
