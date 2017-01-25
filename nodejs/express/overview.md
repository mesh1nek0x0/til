# Express
nodejsようの軽量フレームワーク

## content-typeなど
特に気にしなくていい感じのものが設定されている。

e.g. renderメソッドHTMLを出力するので、内部的にcontent type をhtmlで出力しているなど

なお、character setのデフォルトはUTF-8の模様（今のご時世そうだよね）

```
  if (typeof chunk === 'string') {
    encoding = 'utf8';
    type = this.get('Content-Type');

    // reflect this in content-type
    if (typeof type === 'string') {
      this.set('Content-Type', setCharset(type, 'utf-8'));
    }
  }
```

cf. https://github.com/expressjs/express/blob/3c54220a3495a7a2cdf580c3289ee37e835c0190/lib/response.js#L157-L165