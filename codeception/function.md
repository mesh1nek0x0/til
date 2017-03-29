# 学習した関数
## grabTextFrom(String $cssOrXPathOrRegex)
指定したCSS/XPathでテキストノードを取得できる。
正規表現を利用してマッチするものを取得することもできるそうな。

※正規表現でも、返ってくるのは配列とかじゃないのでパースはご自身で。

## selectOption(String $select, mixed $option)
$selectはselect要素の指定（XPathなど）

$optionはselect要素のvalueを指定するようです。

複数項目選択可能な場合はarrayを渡してあげるとよいもよう。

## seeOptionIsSelected(String $select, mixed $optionText)
指定のオプションが選択されているか確認できる

複数項目は不明...必要になった時に確認しよう 