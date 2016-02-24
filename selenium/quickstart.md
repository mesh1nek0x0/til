# Quick Start
まずはコードを書かずどんなものか試します

＠Attention!!!前提＠

* mac OS X El Capitan ver 10.11.3
* $ homebrew ver 0.9.5 (git revision 41132; last commit 2015-10-04)

## install
brew installの一撃で終わります。

```bash
$ brew install chromedriver
==> Downloading https://chromedriver.storage.googleapis.com/2.19/chromedriver_ma
######################################################################## 100.0%
==> Caveats
To have launchd start chromedriver at login:
  ln -sfv /usr/local/opt/chromedriver/*.plist ~/Library/LaunchAgents
Then to load chromedriver now:
  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.chromedriver.plist
==> Summary
🍺  /usr/local/Cellar/chromedriver/2.19: 3 files, 10M, built in 8 seconds
```

## Run
### chromedriverを実行します。
どうやら9515ポートでサービスが立ち上がるようです。

```bash
$ chromedriver 
Starting ChromeDriver 2.19.346063 (38b35413bd4a486d436a9749e090454bc9ff6708) on port 9515
Only local connections are allowed. 
```

### sessionを発行します。
このcurlを実行すると、ブラウザが立ち上がってコンソールにもJSONが返ってきます.

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"desiredCapabilities":{"browser":"chrome"}}' http://localhost:9515/session
# みやすく整形しています
{
    "sessionId": "2e6cb3ede9c414c78762e2107267eb8c",
    "status": 0,
    "value": {
        "acceptSslCerts": true,
        "applicationCacheEnabled": false,
        "browserConnectionEnabled": false,
        "browserName": "chrome",
        "chrome": {
            "userDataDir": "/var/folders/3q/bslqbv9d6r16b6s5914dz9ww0000gn/T/.org.chromium.Chromium.ZbKY3i"
        },
        "cssSelectorsEnabled": true,
        "databaseEnabled": false,
        "handlesAlerts": true,
        "hasTouchScreen": false,
        "javascriptEnabled": true,
        "locationContextEnabled": true,
        "mobileEmulationEnabled": false,
        "nativeEvents": true,
        "platform": "Mac OS X",
        "rotatable": false,
        "takesHeapSnapshot": true,
        "takesScreenshot": true,
        "version": "48.0.2564.116",
        "webStorageEnabled": true
    }
}

### 取得したセッションを使って実際にアクセスしてみます.
以下のcurlを実行すると、googleのトップが自動的に開きます。

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"url":"http://www.google.com/"}' http://localhost:9515/session/2e6cb3ede9c414c78762e2107267eb8c/url
# こちらも見やすく整形しています。
{
    "sessionId": "2e6cb3ede9c414c78762e2107267eb8c",
    "status": 0,
    "value": null
}
```

## 動作サンプル
※JSON解析にjqコマンドを使っています.

![](https://lh3.googleusercontent.com/-ahc0x2K53_g/Vs24hOlhsAI/AAAAAAAAAj4/MZpseLvrDCg/h240/selenium-sample.gif)
```bash:quickstart-sample.sh
#!/bin/bash
session_id=`curl -X POST -H "Content-Type: application/json" -d '{"desiredCapabilities":{"browser":"chrome"}}' http://localhost:9515/session | jq -r .sessionId`

curl -X POST -H "Content-Type: application/json" -d '{"url":"http://www.google.com/"}' http://localhost:9515/session/$session_id/url

```
