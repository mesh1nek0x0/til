# JSの静的解析まわり
## ざっくり
PHPならPHP Mess DetectorとかPHP_CodeSnifferとかありましたが、
その手の静的解析ツールはJSにもあるらしい。（そりゃそうだろう）

## 有名どころ

* [JSLint](http://jslint.com/):☆☆☆（使い勝手悪そう）
 * 2007~ 2013年頃が最盛
 * デフォルトのチェックが厳しめらしい
* [JSHint](http://jshint.com/):★★☆（トラブルシュートはいっぱいありそう）
 * 2011~ 2015年頃が最盛
 * JSLintをforkしてデフォルトのチェックを緩く、柔軟な設定をできる
* [ESLint](http://eslint.org/):★★★（つかいやすそう）
 * 2013~ 2016/08/18現在アツい
 * ルールの拡張を自由に行える(Pluggable)のが特徴
 * ルールの警告度合いは個別に調整できる
 * 新しいこともあり、ドキュメントが充実していたり

※lint（糸くず）はもともとC言語のソースの静的解析の用語だったけど転じていろいろ用いられているらしい。由来は乾燥機の糸くず取りのlint trap。

![](https://lh3.googleusercontent.com/6qzMmJivdi_-Axql6waL6iX_YXXYSpm6oq7uLLQDKvWSxez1Yu1AQd75ozhAIIXkaZut_6jtlt7TzYhMI--YUqn3a0dqXtpddmY6JRkNzED2E4zFWRFr_t6pGnkstggnzHEGbM7ewbN3YdWH80TCKy8QqQyyxBt7zNJFIXpMciQuEPf2Oy9fjiV3kkkXjPryLwbYLUL0jKs-vwy7lJagWD8qrszRZhVBsWMvwxXyaKDnTammVisjiglZI5d1k8veWNlPXufaJm7_ZYonxrGL51Bc0qgJzhuM7-sK50YDDuoW1s6K5qkCv582iQK7M9iGdwO0tl_N8DkgXCBApOy1R4MHIW9hV7wSuSiDB8U9k2tUUkXay18dkBVwB8lhnkLNmWvOsM0cfcUjKgUyuttSr7b5hg0t6qfnbJ98q0AwKipJfFEftYbmM-2tjjoQxPybzM7aaFngMWX2Iwby7V_Wfx5r1mE6ohMZNA6f-hy5gORBeJH54VYI9JiQaksK3ZddjoopcGzkMNGDIK1YS7dBNpkZ0ZimvdWKxWtrhuEv7tUlBIf0bxY-Xb0zgq7PgVb5xY_uHWFHHBAPpNVefkwiDKDY3JZ66ng=w1132-h780-no)
cf. https://www.google.co.jp/trends/explore?date=all&q=JSLint,JSHint,ESLint


cf. https://maku77.github.io/js/tool/static-analysis-tools.html
