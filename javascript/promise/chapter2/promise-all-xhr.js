const XMLHttpRequest = require('XMLHttpRequest').XMLHttpRequest;
function getURL(URL) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest;
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.status));
      }
    };
    req.onerror = function () {
      reject(new Error(req.status));
    }
    req.send();
  });
}

var request = {
  comment: function getComment() {
    return getURL(
      'http://azu.github.io/promises-book/json/comment.json'
    ).then(JSON.parse);
  },
  people: function getPepole() {
    return getURL(
      'http://azu.github.io/promises-book/json/people.json'
    ).then(JSON.parse);
  }
};

function main() {
  return Promise.all([request.comment(), request.people()]);
}

main().then(function (value) {
  console.log(value);
}).catch(function (error) {
  console.error(error);
});
