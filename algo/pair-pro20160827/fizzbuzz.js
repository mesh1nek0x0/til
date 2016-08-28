const fs = require('fs');

(function () {
  var rfs    = fs.readFileSync('/dev/stdin', 'utf8');
  var input  = rfs.split("\n");
  var N      = parseInt(input[0]);
  var output = '';

  for (var i = 1; i <= N; i++) {
    if (i % 15 === 0) {
      output = 'FizzBuzz';
    } else if (i % 5 === 0) {
      output = 'Buzz';
    } else if (i % 3 === 0) {
      output = 'Fizz';
    } else {
      output = i;
    }
    console.log(output);
  }
}());
