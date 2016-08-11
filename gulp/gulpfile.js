var gulp = require('gulp');

gulp.watch('./*.log', function(event) {
    console.log('File ' + event.path + 'was ' + event.type + ', running tasks...');
});

gulp.task('default', function() {
  console.log('hello gulp!!!');
});
