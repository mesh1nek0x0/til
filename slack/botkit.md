# botkitに関するメモ

## config
* retry
 * Retry is disabled by default
 * Positive integer or Infinity...Infinityってどうやって指定するんだろう？
 * Maximum number of reconnect attemptsと書かれているので再接続の施行回数っぽい
 
## controller.hears
* 正規表現で受け取るメッセージのマッチングができる
* message.textでテキストの内容が取得できる