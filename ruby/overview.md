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
