# electronで簡単なアプリを作ります
## nodeの導入
```
### node.jsのバージョン管理のためにnodebrewを入れます
# ローカルに入れるnodeのversionが分かれたりしない人は大丈夫
$ brew install nodebrew
==> Downloading https://github.com/hokaccha/nodebrew/archive/v0.8.1.tar.gz
==> Downloading from https://codeload.github.com/hokaccha/nodebrew/tar.gz/v0.8.1
######################################################################## 100.0%
==> /usr/local/Cellar/nodebrew/0.8.1/bin/nodebrew setup_dirs
==> Caveats
Add path:
  export PATH=$HOME/.nodebrew/current/bin:$PATH

To use Homebrew's directories rather than ~/.nodebrew add to your profile:
  export NODEBREW_ROOT=/usr/local/var/nodebrew

Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

zsh completion has been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/nodebrew/0.8.1: 7 files, 48K, built in 5 seconds
### nodebrewでnodeをいれます
# nodebrewじゃない人はbrewで入れるとOK
$ nodebrew install-binary v6.1.0
fetch: http://nodejs.org/dist/v6.1.0/node-v6.1.0-darwin-x64.tar.gz
Warning: Failed to create the file
Warning: /Users/iida-ryota/.nodebrew/src/v6.1.0/node-v6.1.0-darwin-x64.tar.gz:
Warning: No such file or directory
# そんなディレクトリねぇよ...ということで
curl: (23) Failed writing body (0 != 2400)
download faild: http://nodejs.org/dist/v6.1.0/node-v6.1.0-darwin-x64.tar.gz
$ mkdir -p ~/.nodebrew/src
$ nodebrew install-binary v6.1.0 # 今日現在のelectronのnodeがv6.1.0
fetch: http://nodejs.org/dist/v6.1.0/node-v6.1.0-darwin-x64.tar.gz
######################################################################## 100.0%
Install successful

# おまけにpathを設定しておきます
# echoの内容はnodebrewを入れた時に出てる
$ echo 'PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
$ source ~/.bash_profile

# いれたバージョンに切り替えます
$ nodebrew use v6.1.0
$ node -v
v6.1.0
```

## package.jsonの作成
```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (sample) sample
version: (1.0.0) 0.0.0
description: サンプル
entry point: (index.js) main.js
test command: echo \"Error: no test specified\" && exit 1
git repository: git
keywords:
author: mesh1neko
license: (ISC) MIT
About to write to /Users/iida-ryota/Documents/til/electron/sample/package.json:

{
  "name": "sample",
  "version": "0.0.0",
  "description": "サンプル",
  "main": "main.js",
  "scripts": {
    "test": "echo \\\"Error: no test specified\\\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git@github.com:Sample/sample.git"
  },
  "author": "mesh1neko",
  "license": "MIT"
}


Is this ok? (yes) y
```

## コードを書きます
下記を参考にコードを準備します
https://github.com/electron/electron-quick-start

* index.html # 描画するView
* main.js # 全体制御

## electronを入れます
```
# -gはグローバルインストール
$ npm -g install electron-prebuilt
...(ry
```

## アプリを立ち上げてみます
JavaScriptエラーがでるときはどこか間違えてる
```
$ electron sample/
^C
```

## アプリのパッゲージング
今回はmac&win用にパッケージ化します。

```
### npmでpackagerを入れます
$ npm install electron-packager -g
$ electron-packager ./sample sample-app --platform=darwin,win32 --arch=x64 --version 1.0.0
# package.jsonがないディレクトリで実行すると
# Error: Unable to find a valid app と怒られる
```

## 参考
* [@IT:Electron 1.0でデスクトップアプリ開発超入門](http://www.atmarkit.co.jp/ait/articles/1605/18/news017.html)
* [Qiita:30分で出来る、JavaScript (Electron) でデスクトップアプリを作って配布するまで](http://qiita.com/nyanchu/items/15d514d9b9f87e5c0a29)
