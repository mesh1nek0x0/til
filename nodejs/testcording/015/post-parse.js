var http = require('http');
var querystring = require('querystring');
var setting = require('./setting');

var server = http.createServer();

server.on("request", function(req, res) {
  if (req.method === "POST") {
    console.log(req.toString());
    var data = "";
    req.on("readable", function() {
      data += req.read();
    });

    req.on("end", function() {
      var query = querystring.parse(data);

      if (query.foo == "value") {
        console.log("foo is : " + query.foo);
      } else {
        Object.keys(query).forEach(function (index) {
          console.log(query[index] + "@" + index);
        });
      }
    });
  }

  res.writeHead(200);
  res.write("req end\n");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
