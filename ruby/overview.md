# ruby概要
まつもとひろゆきさんが作ったスクリプト言語

## quickstart
irbコマンドでインタラクティブに実行できます。
```
$ irb
irb(main):001:0> p "hoge"
"hoge"
=> "hoge"
irb(main):002:0> exit
```

## reference
manコマンドみたいな説明がでてきます。空行でぬけられます。
```
$ ri

Enter the method name you want to look up.
You can use tab to autocomplete.
Enter a blank line to exit.

>> array
>> p
>> exit
>>

### 指定して実行もできます
$ ri p
```

## 記法の基礎
* １行コメントは#で
* 複数行コメントは =begin~=endまで

```
$ cat basicNotation.rb
#!/bin/ruby
# comment sample

=begin
comment sample
comment sample
comment sample
comment sample
comment sample
=end

print "hello ruby" # 改行なしの出力
puts "hello ruby" # 改行ありの出力
p "hello ruby" # phpでいうvar_dumpに近い

$ ruby basicNotation.rb
hello rubyhello ruby
"hello ruby"
```

## 変数と定数
* 英小文字または_から始める
* 英大文字だと定数扱いになる
 * ただし、定数なので上書きできない...と思いつつwarningが出るだけで上書きできちゃう

```
$ ruby variables.rb
hello ruby
1.0
variables.rb:11: warning: already initialized constant VERSION
variables.rb:8: warning: previous definition of VERSION was here
2.0
```
