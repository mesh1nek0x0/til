'use strict';

const fs = require('fs');

(function () {
  var rfs    = fs.readFileSync('/dev/stdin', 'utf8');
  var input  = rfs.split('\n');
  var W      = input[0];
  var H      = input[1];
  var N      = input[2];
  var mark   = [];
  var number = [];

  for (var i = 0; i < N; i++) {
    let tmp = input[i + 3].split(' ');
    mark.push(tmp[0]);
    number.push(tmp[1]);
  }

  var uniqMark = mark.filter(function (element, index, self) {
    return self.indexOf(element) === index;
  });

  var uniqNumber = number.filter(function (element, index, self) {
    return self.indexOf(element) === index;
  });

  var output = uniqMark.length * H + uniqNumber.length * W - uniqMark.length * uniqNumber.length - N;
  console.log(output);

}());
