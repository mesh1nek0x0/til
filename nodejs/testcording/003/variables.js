var IP_ADDRESS = "localhost";
var PORT       = 8080;

var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("hello at 003\n");
}).listen(PORT, IP_ADDRESS, function() {
    console.log("Server is running at http://" + IP_ADDRESS + ":" + PORT + "/");
});
