'use strict';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getURL(URL) {
  return new Promise(function (resolve, rejecet) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        console.log('promise is resolve');
        resolve(req.responseText);
      } else {
        console.log('promise is reject');
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    }
    
    req.send();
  })
}

var URL = 'http://httpbin.org/get';
getURL(URL).then(function onFulfill(value) {
  console.log(value);
}).catch(function onReject(error) {
  console.error(error);
});