# slackで使える便利なもの

## emojiのbulkアップロード
設定から1個１個あげるの大変面倒ですよね。bulkでやってくれるnpmです。

https://github.com/lambtron/emojipacks

```
$ npm install -g emojipacks
...(ry
$ emojipacks
Slack subdomain: hoge
Email address login: foo@example.com
Password: *********
Path or URL of Emoji yaml file: https://raw.githubusercontent.com/templarian/slack-emoji-pokemon/master/pokemon-prefix.yaml
Starting import
Got tokens
Logged in
Upload crumb is s-1437797544-90b75206a7-☃
Getting emoji page
Uploading pokemon-bulbasaur with http://i.imgur.com/J9ynKU9.png
Uploading pokemon-ivysaur with http://i.imgur.com/2BmEJY1.png
...
```

リストからガンガンいけるのでポケモンの絵文字も入れ放題！

https://github.com/Templarian/slack-emoji-pokemon
