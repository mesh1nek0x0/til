# WebDriver Moduleについて
## Localでやるとき
以下の２択らしい。

1. Selenium Serverを使う
1. PhantomJSを使う

どちらもcodeceptionのPHPのコードからリクエストを受け取るようです。
[codeception] <-> [Selenium Server|PhantomJS]

### ＠Selenium Server

#### サーバ立ち上げ
公式サイトからjarをDLしてデーモンとして立ち上げておく。
どうやらlocalhost:4444というのがデフォルトのhostとportらしい。

```bash
$ java -jar selenium-server-standalone-2.xx.xxx.jar
```

#### 設定ファイル編集
テストの設定ファイルである*.suite.ymlに
WebDriverモジュールの読み込み宣言をします。
あとは詳細設定としてurlとbrowserを設定すれば準備完了.

*.suite.yml
```bash
modules:
  enabled:
    - WebDriver:
        url: 'http://localhost'
        browser: firefox
```

### 手軽に操作するために覚えるメソッド

#### amOnPage(string $page)
相対URIを開きます.
(note:URIは情報源の識別子)

#### amOnUrl(string $url)
絶対URLを開くきます.
(note:URLは情報の場所)

#### click(string $link, string $context = null)
リンクをクリックします.
渡されたリンクの文字列とマッチする、
ボタン・リンク・イメージをページから検索します.
第二引数は検索範囲を狭めるためのCSS selectrやXPathを指定できる.

#### submitForm(string $selector, array $params, string $button = null)
ページ上のformを引数に従って送信します。
(note:hiddenの値はアクセスできないらしい)
なお、clickを押す必要はなくformのactionに従って送信も実行.

動作sample

```php
/**
 * @param \SeleniumTester $I
 */
public function dmmSearch(SeleniumTester $I)
{
    $I->amOnUrl("http://www.dmm.com");
    $I->submitForm('#frmSearch', [
        'searchstr' => '艦これなのです！',
    ]);
    $I->see('艦これなのです！ 艦隊これ...');
    $I->click('艦これなのです！ 艦隊これくしょん -艦これ-');
    $I->wait(5);
}
```

![](https://lh3.googleusercontent.com/-dxJijnmNlHQ/VtFo5nNl2TI/AAAAAAAAAkM/eUIbLmBn58I/s576-Ic42/9b57edecae52e52f6006975edd30d4d3.gif)
