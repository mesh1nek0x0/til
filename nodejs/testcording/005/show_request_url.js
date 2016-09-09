var IP_ADDRESS = 'localhost';
var PORT       = '8080';

var http = require("http");

http.createServer(function (req, res) {
    console.log(req.url);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello from 005 URL@" + req.url + "\n");
}).listen(PORT, IP_ADDRESS, function () {
    console.log("Server is running at http://" + IP_ADDRESS + ":" + PORT + "/");
});
