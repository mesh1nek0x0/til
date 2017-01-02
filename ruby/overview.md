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

## オブジェクト
rubyは全てがオブジェクトだそうです。jsみたいですかね。

```
$ ruby basicObject.rb
hello ruby!
11
!ybur olleh
2
1
```

基本的なメソッド
```
### クラス名取得
Object.class
### メソッド一覧取得
Object.methods
```

### 数値オブジェクト
基本的にほかの算術演算子と一緒。べき乗だけ**です。

これメソッドに+とか-とかあるのなんでなんだろうか。

算術演算子とはまた違うのか...？
```
$ ruby basicNumericObject.rb
Float
[:to_s, :inspect, :-@, :+, :-, :*, :/, :div, :%, :modulo, :divmod, :fdiv, :**, :abs, :magnitude, :==, :===, :<=>, :>, :>=, :<, :<=, :~, :&, :|, :^, :[], :<<, :>>, :to_f, :size, :zero?, :odd?, :even?, :succ, :integer?, :upto, :downto, :times, :next, :pred, :chr, :ord, :to_i, :to_int, :floor, :ceil, :truncate, :round, :gcd, :lcm, :gcdlcm, :numerator, :denominator, :to_r, :rationalize, :singleton_method_added, :coerce, :i, :+@, :eql?, :quo, :remainder, :real?, :nonzero?, :step, :to_c, :real, :imaginary, :imag, :abs2, :arg, :angle, :phase, :rectangular, :rect, :polar, :conjugate, :conj, :between?, :nil?, :=~, :!~, :hash, :class, :singleton_class, :clone, :dup, :taint, :tainted?, :untaint, :untrust, :untrusted?, :trust, :freeze, :frozen?, :methods, :singleton_methods, :protected_methods, :private_methods, :public_methods, :instance_variables, :instance_variable_get, :instance_variable_set, :instance_variable_defined?, :remove_instance_variable, :instance_of?, :kind_of?, :is_a?, :tap, :send, :public_send, :respond_to?, :extend, :display, :method, :public_method, :define_singleton_method, :object_id, :to_enum, :enum_for, :equal?, :!, :!=, :instance_eval, :instance_exec, :__send__, :__id__]
8
8
8
8
8
3.3333333333333335
3
(8/1)
```

### 文字列オブジェクト
これもbashと同じ感じですね

"":特殊文字と式展開可能
'':何もしない

文字列の連結は+でできて、*をすると繰り返しになる、便利ですね。

```
$ ruby basicStringObject.md
hello
ruby	!!!
hello\nruby\t!!!
msg is hoge
msg is #{msg}
price is 1600
price is #{200 * 8}
msg is hoge
hogehogehogehogehogehogehogehogehogehoge
```

## ?と!メソッド
!:オブジェクトの値を変えちゃうので破壊的メソッド
?:真偽値を返すメソッド

```
$ ruby bangBooleanMethod.rb
HOGE
hoge
HOGE
HOGE
false
true
```

## 配列
* 配列は()でなく[]です
* 添字には負の値も指定できる
* [0..n] 0~n以下
* [0...n] 0~n未満
* 数はcountではなくsize

```
$ ruby array.ruby
"pen"
"hoge"
["pen", "apple", "hoge"]
["pen", "apple"]
["red", "gray"]
["red", "gray", "blue"]
["red", "gray", "blue", "green"]
```

## hashオブジェクト
* key/value
* 記法がいくつかある
 * key名の前に:をつける書き方はシンボルと呼ぶようです
 * シンボル記法はよく使うみたいです
 * シンボルを使って書く場合の短縮記法はJSONっぽい

```
$ ruby hash.rb
{"tarou"=>100, "jirou"=>200}
{:id001=>"tarou", :id002=>"jirou"}
{:id001=>200, :id002=>400}
2
[:id001, :id002]
[200, 400]
false
```

## オブジェクトの変換
PHPみたいに型がガバガバではないので、型変換が必要です

* to_i(integer)
* to_f(float)
* to_s(string)
* to_a(array)
* to_h(hash)

array.to_hはruby2.0にはなく2.1のリファレンスにはあった

```
$ ruby convertObject.rb
Fixnum
mesh1neko is 100
String
150
{:hoge=>100, :foo=>200}
[[:hoge, 100], [:foo, 200]]
```

## %記法
楽に書ける記法

""や''をで囲む必要がない模様。便利そうである。

生成するものによって%のあとにつけるものが変わる

なお、小文字の場合は'、大文字は"と同じ扱いになる

* q/Q:文字 省略した場合はQと同義
* w/W:配列

```
$ ruby percentNotation.rb
hello" ruby
hello' ruby
hello' ruby
hello" ruby
hello' ruby
["red", "blue"]
["red", "blue"]
["red", "blue"]
["red", "blue"]
```

## 書式付き
"文字列" % 値　※値が複数の場合は配列で渡す

フォーマット指定はだいたい他の指定と似ている。

* %s: 数字をつけることで幅、-をつけることで左寄せにできる
 * %-5sだと５文字幅の左寄せ

```
$ ruby formattedString.rb
"name: mesh1neko"
"name:  mesh1neko"
"name: mesh1neko "
"id: 00355, rate:       3.28"
name: mesh1neko
"id: 00355, rate:       3.14"
```

## 条件分岐
* だいたい一緒ですが、else ifではなくelsif
* 単純な条件分岐だと後ろにも書ける...

```
if <criteria> [then]
...
elsif
..
else
..
end
```

```
$ ruby ifcondition.rb
56
soso
$ ruby ifcondition.rb
99
so good!
score > 80 codition written in postposition
```

## case分岐
* 書き出しはswitchではない
* whenでつなぐ
* defaultの代わりにelseとつなぐ
* ifと同じくendで終わり

```
$ ruby case.rb
red
"input signal is red"
stop
$ ruby case.rb
blue
"input signal is blue"
go
$ ruby case.rb
green
"input signal is green"
go
$ ruby case.rb
pink
"input signal is pink"
wrong signal
```

## loop
* while <condition> do ... end
* <num>.times do [|i|]... end
* do ... endかわりに{}で1行で書くことが多いらしい
 * スコープがはっきりして{}の方がしっくりくるかも
* for <value> in <array> do ... end
* for <key, value> in <hash> do ... end
* <array>.each do |color| ... end
* <hash>.each do |key, value| ... end
 * do ... end部分は同様に{}で書き換えられる
* loop do ... end

```
$ ruby loop.rb
2
hoge
hoge
0: hello
1: hello
2: hello
3: hello
4: hello
5: hello
6: hello
7: hello
8: hello
9: hello
0: foo
1: foo
2: foo
3: foo
4: foo
15
16
17
18
19
20
"blue"
"red"
"green"
1
2
3
tarou: 100
jirou: 200
```

### breakとnext
* break:終わり。他の言語と同じ
* next:次の処理へ。他の言語のcontinue
```
$ ruby breakNext.rb
0
1
2
4
5
6
3
```

## メソッド
def <function name> [(args)] ... end

* 最後に評価された値を返す
 * returnを省略できる　※明示もできる
* 引数を設定し、デフォルト値も設定できる
 * 設定がない際に省略するとエラーになります
* 呼び出す際に、()を省略できる場合もある
* 呼び出し元のオブジェクトをレシーバーというらしい
```
$ ruby method.rb
mesh1neko
"hi! ruby"
"hi! mesh1neko"
"hi! mesh1neko"
"hello! mesh1neko"
method.rb:8:in `sayHello': wrong number of arguments (0 for 1) (ArgumentError)
	from method.rb:17:in `<main>'
```

## class
* calss宣言はそのまま
* functionはdef ... endを利用
* コンストラクタはdef initialize [name...] ... end
* インスタンス変数は@をつけて宣言する
* インスタンスは.newで生成できる

```
$ ruby class.rb
"hi! tom"
"hi! mesh1neko"
"hi! nanashi"
```

### accessor
どうもprivateとかpublicのアクセス修飾子はないのかな？

　→　これはちゃんとあるらしい。ただしちらっと見た感じ他の言語とは少しことなりそう...

* attr_accessor :symbol
 * これでgetter/setterの宣言ができる
* attr_reader :symbol
 * これはgetter only
* インスタンス内の変数やメソッドにはselfでもアクセスできる

```
$ ruby class.rb
tom's id : 1483251415
mesh1neko's id : 1483251416
nanashi's id : 1483251417
"hi! tom"
"hi! mesh1neko"
"hi! nanashi"
1483251415
Tom
"hi! Tom"
class.rb:34:in `<main>': undefined method `id=' for #<User:0x007fd01a87dad8 @name="Tom", @id=1483251415> (NoMethodError)
```

## クラスメソッド/変数/定数
各インスタンスで共有される値
* クラスメソッドはdef self.<method> ... endで定義する
* クラス変数は@@<variable>で定義する
* クラス定数は[^A-Z]{1}.*で定義する。慣例で全部大文字が多い

```
$ ruby class-method-variables.rb 
1.1
hi yuma
hi chika
hi osamu
there are 3's instances. @ version 1.1
```

## 継承
* <Sub class> < <Super Class>で宣言できます
* オーバライドや親のメソッドが使えるのは他の言語と同じそう
* 親クラスでattr_readerとしている値を子クラスでattr_accessorとして変更できる
```
$ ruby class-extend.rb 
tarou's id:1483357537
superTarou's id:1483357537
superTarou's id:1483357538
```
