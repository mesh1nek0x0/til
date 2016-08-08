const http        = require('http');
const querystring = require('querystring');
const setting     = require('./setting');

var server = http.createServer();

var HTML_HEAD = '\
<!DOCTYPE html>\
<html>\
<head>\
<meta charset="UTF-8">\
<title>nodejs sample</title>\
</head>\
';

var HTML_BODY = '\
<body>\
<div>\
<h1>lucky number</h1>\
<form method="post" action="/">\
birthdate\
<label><input type="text" name="year" />年</label>\
<label><input type="text" name="month" />月</label>\
<label><input type="text" name="day" />日</label>\
<input type="submit" value="ラッキーナンバーは？" />\
</div>\
</body>\
';

var HTML_FOOTER = '\
</html>\
';

server.on("request", function(req, res) {
  if (req.url !== "/") {
    res.writeHead(404, setting.HEADER);
    res.end("ERROR NOT FOUND");
    return ;
  }

  if (req.method !== "POST") {
    res.writeHead(200, setting.HEADER);
    res.write(HTML_HEAD);
    res.write(HTML_BODY);
    res.write(HTML_FOOTER);
    res.end();
    return ;
  } else {
    req.data = "";
    var tmp = "";
    req.on("readable", function() {
      tmp = req.read();
      if (tmp !== null) {
        req.data += tmp;
      }
    });
    req.on("end", function () {
      var query = querystring.parse(req.data);
      Object.keys(query).forEach(function (index) {
        console.log(query[index]);
      })
      var luckyNumber = query.day % 10;
      var resultHtml = '\
      <body>\
      <div>your luckyNumber is ' + luckyNumber + '!!!\
      </body>\
      ';
      res.writeHead(200, setting.HEADER);
      res.write(HTML_HEAD);
      res.write(resultHtml);
      res.write(HTML_FOOTER);
      res.end();
    });
    return ;
  }

  res.writeHead(200);
  res.write("req is ended.\n");
  res.end();
});

server.listen(setting.PORT, setting.IP, setting.startServer);
