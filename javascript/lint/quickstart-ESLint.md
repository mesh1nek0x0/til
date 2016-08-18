# とりあえず触ってみよう。
たいへんお手軽に体験できます。

## ローカルインストール
ESLintをいれます。
```
$ npm init # 例によって、package.jsonを作っておいて
$ npm install eslint --save-dev
$ $(npm bin)/eslint -v
v3.3.1
$ $(npm bin)/eslint --init
? How would you like to configure ESLint? Answer questions about your style # レコメンドスタイルもある
? Are you using ECMAScript 6 features? Yes
? Are you using ES6 modules? Yes
? Where will your code run? Node # 1,2keyで選べる
? Do you use JSX? No
? What style of indentation do you use? Spaces
? What quotes do you use for strings? Single
? What line endings do you use? Unix
? Do you require semicolons? Yes
? What format do you want your config file to be in? YAML # とりあえず記述の楽なYAMLで
Successfully created .eslintrc.yml file in /Users/iida-ryota/Documents/til/javascript/lint

$ cat .eslintrc.yml
env:
  es6: true
  node: true
extends: 'eslint:recommended'
parserOptions:
  sourceType: module
rules:
  indent:
    - error
    - 4
  linebreak-style:
    - error
    - unix
  quotes:
    - error
    - single
  semi:
    - error
    - always
```

## lintされるファイルの準備
あえて、
```
$ cat index.js
'use strict';

console.log('hogeeee')

console.log("fooooooo");

setTimeout(function () {
  console.log('time oooooout!');
}, 300);
```

## lintしてみる
```
$(npm bin)/eslint index.js

/Users/iida-ryota/Documents/til/javascript/lint/index.js
  3:1   error  Unexpected console statement                            no-console
  3:23  error  Missing semicolon                                       semi
  5:1   error  Unexpected console statement                            no-console
  5:13  error  Strings must use singlequote                            quotes
  8:3   error  Expected indentation of 4 space characters but found 2  indent
  8:3   error  Unexpected console statement                            no-console

✖ 6 problems (6 errors, 0 warnings)
```

うひょおおおおお、いいね！
### no-console
デバッグ用の用途だろ？消したほうがいいよね？
http://eslint.org/docs/rules/no-console

### semi
セミコロン忘れてないか？
http://eslint.org/docs/rules/semi

### quotes
"や'など規約通りか？
http://eslint.org/docs/rules/quotes

### indent
tabとかspaceとか、spaceの数とか大丈夫？
http://eslint.org/docs/rules/indent

### 自動修正
semi、quotes、indentは--fixをつけて実行すると直してくれるらしい, wow

```
$ $(npm bin)/eslint index.js --fix

/Users/iida-ryota/Documents/til/javascript/lint/index.js
  3:1  error  Unexpected console statement  no-console
  5:1  error  Unexpected console statement  no-console
  8:5  error  Unexpected console statement  no-console

✖ 3 problems (3 errors, 0 warnings)

$ cat index.js
'use strict';

console.log('hogeeee');

console.log('fooooooo');

setTimeout(function () {
    console.log('time oooooout!');
}, 300);
```
