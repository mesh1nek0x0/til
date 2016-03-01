# XPath（XML Path Language）
 XML文書の中の要素や属性の位置を指定するための言語。

また、指定した要素や属性について条件判定したり、
文字列計算したり、計算結果を使用したりできるそうな。
（なんだかunixのawkみたいです）

たとえば以下のようなXMLツリー構造があるとき
![](https://lh3.googleusercontent.com/-40iS8S6LIwA/VtRQSpAxNUI/AAAAAAAAAkg/_4Y36_DjBcE/s332-Ic42/xml-model-sample.png)

```
# names要素を指定するXPath
/accounts/account/names

# given name属性を指定するXPath
/accounts/account/names/@given-name
```

(Wiki曰く)URIやunixのファイルパスに構造に似せて設計してあるらしい

## 用語
### ノード
ここではXML文書内の要素や属性のこと.

### ルートノード
ツリー上の起点. unixでもおなじみです.

### 要素・属性ノード
要素：<>で区切られた<accounts>や<names>が該当
属性：id="sample0001"とかgiven-name="太郎"が該当
```
<?xml version="1.0"?>
<accounts>
  <account id="sample0001">
    <names given-name="太郎" family-name="田中">
    <address>東京都XXXXX</address>
  </account>
</accounts>
```

### テキストノード
ざつな言い方をするとタグの外にあるものが該当
<address>に挟まれた東京都XXXXXはもちろん、改行コードも含まれる。
```
<?xml version="1.0"?>
<accounts>
  <account id="sample0001">
    <names given-name="太郎" family-name="田中">
    <address>東京都XXXXX</address>
  </account>
</accounts>
```
### コメントノード
XML内のコメント、HTMLでもよくあります。
```
<!-- コメントノードです -->
```

### 処理命令ノード
ちょっと変わり種。見つけた例だけ見てもどう役立てるのか...

```
<xsl:processing-instruction name="xml-stylesheet">
  href="book.css" type="text/css"
</xsl:processing-instruction>
```
↑これが↓こうなるらしい
```
<?xml-stylesheet href="book.css" type="text/css"?>
```

### 名前空間ノード
意味合い的にはプログラムの名前空間と近い。
ちょっと概要の範囲を超えそうなので割愛。


### ロケーションパス
 実際にノードを位置を指定する式のこと（XPathはこの概念全体を指す模様）
※ロケーションパス自体はunixのファイルパスと似てます。

example
```
# 親の要素の子要素であるtitleの子要素
# releaseYear属性を指定（＠は属性）
../title/@releaseYear

```

なお、記法が二種類ある。
* 簡略記法　：ファイルパスっぽい
* 正式な記法：とても長いけど、細かい指定ができる

### ロケーションステップ
ロケーションパスを構成する要素。

１つ以上のロケーションステップを組み合わせて１つのロケーションパスとなる。

また、ロケーションステップ自体も以下の３つのパートで構成されています。
* 軸　　　　　：相対的な位置関係
* ノードテスト：ノードの種類と名称
* 述語　　　　：ノードの集合を細かく指定する
```
ロケーションステップ = 軸::ノードテスト[述語]
```

example
```
# 簡略
//track[2]/text()
# 正式
/descendant-or-self::node()/child::track[position()=2]/child::text()
```
