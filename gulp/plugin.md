# gulpでよく使うpluginについて

## gulp-load-plugins
いちいちrequire xxという読み込みをしなくてもいい感じに読み込んでくれる

```
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

function lint(files, options) {
    return gulp.src(files)
    .pipe($.eslint(options))
    .pipe($.eslint.format());
}
```

## gulp-eslint
gulpでeslintをやるためのプラグイン

## gulp-plumber
エラーが発生するとgulp自体が終了してしまうのを

## gulp-notify
エラーが発生した際にデスクトップに通知を出せる

### node-notifier
エラー有無にかかわらず好きなタイミングでデスクトップ通知できる

## gulp-nodeamon
gulpでnodeamonを使うためのプラグイン