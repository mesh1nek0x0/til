exports.IP   = "localhost";
exports.PORT = 8080;
exports.startServer = function () {
  console.log("server is running at http://" + exports.IP + ":" + exports.PORT);
};
