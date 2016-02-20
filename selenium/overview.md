# Selenium
![](http://docs.seleniumhq.org/images/selenium-logo.png)
ブラウザを使った自動化ツール

> Selenium is a suite of tools to automate web browsers across many platforms.
>
> runs in many browsers and operating systems
> can be controlled by many programming languages and testing frameworks.

Selenium1 Selenium2と呼ばれることもあるが正しくは
Selenium RC (Remote Controler) と Selenium WebDriverである。

## Selenium RC
 JavaやPythonなどで書かれたスクリプトを元に、ブラウザを操作するjsを生成し、
対象サイトに埋め込んで実行する仕組み。
それゆえに、セキュリティの制限を受けることが多い点が欠点となっている。
また、今後非推奨として開発も凍結されている。

> The old versions will still be available as a separate download,
> but active development will cease, except for very urgent fixes.
> We will still be providing an implementation of the RC APIs backed by WebDriver,
> so you can continue running your existing tests, 
> but now would be a great time to make the move to using the WebDriver APIs directly.

cf. [The Road to Selenium 3](https://seleniumhq.wordpress.com/2013/08/28/the-road-to-selenium-3/)

## Selenium WebDriver
 ブラウザの拡張機能やOSのネイティブ機能を利用してブラウザを操作する仕組みに切り替えたもの。
ブラウザごとにそれぞれのドライバが用意されており、JSON Wire Protcol（Seleniumが定義しているRESTful API）
に従ってブラウザを操作することができます。
