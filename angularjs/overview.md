# Superheroic JavaScript MVW Framework by Google
とてもheroicなjsのMVW(Whatever:MV以外はいろいろあってもいいという考え）のフレームワークです。

## これまでのjsの世界
かの有名なjQueryをもってしても、言語特有の癖であるグローバル変数が多かったり、クロスブラウザ問題（ブラウザによって挙動が異なる）があったりして、大規模開発には向かなかった。
テストも自動化も困難で、アプリの構造化も難しい...

## AngularJSでできること
* HTMLベースのテンプレートエンジン
* テンプレートを動的に操作する(ディレクティブ)
* Linuxのパイプっぽい値加工(フィルター)
* ビジネスロジックを実装できる（サービス）
* データの双方向バインディング（モデル、コントローラ、スコープ）
* URLに応じたルーティング
* DIコンテナ
* テスト用のモック

## 一番簡単なサンプル

[AngularJS公式：The Basics](https://angularjs.org/)

## 動かしたサンプル
なんとなくどんなことができそうかわかる感じ。

index.html
```
<!doctype html>
<html ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>AngularJS</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min.js"></script>
    <script src="./scripts/books.js"></script>
</head>
<body ng-controller="MyController">
    <table class="table">
      <tr>
        <th>ISBN code</th><th>name</th><th>price</th><th>publisher</th><th>published</th>
        <tr ng-repeat="book in books">
          <td>{{book.isbn}}</td>
          <td>{{book.title}}</td>
          <td>{{book.price}}</td>
          <td>{{book.publisher}}</td>
          <td>{{book.published | date: 'yyyy/MM/dd'}}</td>
        </tr>
    </table>
</body>
</html>
```
scripts/books.js
```
angular.module('myApp', [])
  .controller('MyController', function($scope, BookList) {
    $scope.books = BookList();
  })

  /* service : define bussiness logic*/
  /* 本来はここでAjaxでデータ取ってくるとか */
  .value('BookList', function() {
    return [
    {
      isbn: '123-4-5678-9012-3',
      title: 'hoge',
      price: '100',
      publisher: 'gihyo',
      published: new Date(2015, 0, 8)
    },
    {
      isbn: '123-4-5678-9012-4',
      title: 'piyo',
      price: '200',
      publisher: 'gihyo',
      published: new Date(2016, 0, 8)
    }
    ]
    }
  );

```
