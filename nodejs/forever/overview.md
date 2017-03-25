# overview
scriptをお手軽に不死身なデーモン化できる、まさにforever

## quickstart
### install
今回はDocker上なのでdockerコンテナにて。
```
$ npm install -g forever
```

### basic usage
実行するのはscriptならjsである必要はないようです。※実行コマンドのdefaultはnode
```
$ forever start app.js
```

実行中のものの確認はlistで確認できる
```
$ forever list
info:    Forever processes running
data:        uid  command             script   forever pid id logfile                         uptime
data:    [0] RQBf /usr/local/bin/node index.js 60      70     /home/minions/.forever/RQBf.log 0:0:3:3.652
```

### advanced usage
実行時にさまざまなオプションを指定でき、引数として渡すことも可能だが設定ファイルとして指定できる
```
$ forever start ./forever/development.json
```

どうやら変更をwatchすることができる模様。これはもしかしてnodemonでやったこともできる説

いくらか記事をみるとnodemonは開発向きなのでちょっと用途が違うっぽい。今度調べたい。