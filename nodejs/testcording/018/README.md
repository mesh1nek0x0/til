# 実装サンプル018
とうとう基礎編最後です！

今回も基礎知識の組み合わせの確認なのでほとんど記載することがありません。

今回着目したのはこのくらい
```
req.on("end", function() {
  var query = querystring.parse(req.data);

  CHAT_LOG.push(query.content); # 配列は他言語同様にpushできる
  res.writeHead(200, setting.HEADER);
  res.write(HTML_HEAD);
  res.write(getHtmlBody(CHAT_LOG));
  res.write(HTML_FOOTER);
  res.end();
});
```

## Array.prototype.push()
pushといえば同じみ配列の末尾追加する命令。

返り値が処理後の要素数というところも同じ

cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push
