var IP_ADDRESS = 'localhost';
var PORT       = '8080';

// module load
var fs   = require('fs');
var util = require('util');

(function test() {
    fs.readFile("./testdata", "utf8", function (err, data) {
        console.log("Read file ended");
        console.log(data);
    });
    console.log("readFile call End");
    for (var i = 0, len = 10000; i < len; ++i) {
        util.print(".");
    }
})();
