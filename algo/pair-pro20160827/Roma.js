'use strict';

const fs = require('fs');

(function () {
  var watch = ['I','II','III','IIII','V','VI','VII','VIII','IX','X','XI','XII'];
  var rfs   = fs.readFileSync('/dev/stdin', 'utf8');
  var input = rfs.split('\n')[0].split(' ');
  var S1    = input[0];
  var T     = parseInt(input[1]);
  var output;

  var S1Key = Object.keys(watch).filter( (key) => {
    return watch[key] === S1;
  })[0];

  var rotateDeg = (parseInt(S1Key) + T) % 12;

  if (rotateDeg < 0) {
    // 末尾からn番目を参照したいので+1
    output = watch[11 + rotateDeg + 1];
  } else {
    output = watch[rotateDeg];
  }
  console.log(output);
}());
