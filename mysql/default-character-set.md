# 概要
文字エンコードの設定オプション
これの設定が間違っていると文字化けする要因の１つになる。
結構デリケートな設定。

## トラブルシュート
### unknown variable 'default-character-set=***'
原因は、my.cnfに設定されている値が認識できないからです。
この項目はMySQL5.0以降は非推奨で5.5.3からなくなった設定値。

> Use charset_name as the default character set.
> This option is deprecated in favor of --character-set-server.
> See Section 10.5, “Character Set Configuration”.
> --default-character-set was removed in MySQL 5.5.3.

cf. [MySQL:default-character-set](http://dev.mysql.com/doc/refman/5.5/en/server-options.html#option_mysqld_default-character-set)

#### 応急処置

 --no-defaultsをつけて実行すれば、設定値のデフォルトを無視できます

#### 恒久処置

 my.cnf の [client] セクションにあるdefault-character-setの設定値を
 推奨される設定(character-set-server)で設定し直す。
