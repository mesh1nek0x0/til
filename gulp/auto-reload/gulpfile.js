const gulp  = require('gulp');
const spawn = require('child_process').spawn;

var server;

gulp.task('default', function() {
  console.log("hello from gulp default task!");
});

gulp.task('server-task', function() {
  if (server) {
    server.kill('SIGKILL');
  }
  server = spawn('node', ['index.js']);
});

gulp.task("watch-task", ['server-task'], function() {
  gulp.watch("index.js", ["server-task"]);
});
