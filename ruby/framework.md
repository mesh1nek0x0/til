# rubyのフレームワークについて

## ruby on rails
 * rubyのウェブアプリケーションフレームワーク
 * 2017/01/28時点で最新はv5.0.1
 * RoRや単にRailsとも

### quickstart
* rails new <app>
 * 雛形をバンとつくるやつね
* rails server
 * サーバ起動ですね
* rails generate controller <controller-name> <action-name>
 * controllerとviewファイルおよびassets(scssなど)も生成
 
### 基礎知識
* routingはconfig/routes.rbで上書きできる
* erbはembedded rubyの略
 * rubyは<% %>で操作可能
 * 出力するときは<%=variables%>
 * @指定をつけて変数を宣言することでView(erb)ファイルから参照可能
* 名前付きrouteというものが存在し、rake toutesで表示できる<prefix>_pathで当該URLのエイリアスとなるようです
 * rootのpathは設定が特殊

 ```
 Rails.application.routes.draw do
   root 'home#top' # root pathの指定
   
   get '/about' => 'home#about' # それ以外の指定
   post '/notes' => 'notes#create' # notesへpostされたらnotesControllerのcreateメソッドにルーティング
 end
 ```

* layoutの指定があればcontentsを書くだけで済みます。
 * <%= yield %>の部分にコンテンツが出力されます
 * stylesheet_link_tagやjavascript_include_tagでassetsの読み込みできるそうな
 * <%= form_tag do%><%end%>という楽な書き方でformがかける
 * これらのヘルパーはhtmlの属性をいい感じにかける

```
<%= form_tag do %>
  <%= text_filed_tag(:title, @note.title) %>
  <!-- ()を省略して以下のようにもかける -->
  <%= text_area_tag :content, @note.content %>
  <%= submit_tag 'save' %>
<%= end %>
```

### 補助コマンド:rake routes
routingを確認できるコマンド
```
$ rake routes
Prefix Verb URI Pattern      Controller#Ac
tion
   top GET  /top(.:format)   home#top
 about GET  /about(.:format) home#about
```

### modelとdbまわり
コマンドでORMapper？みたいなものが作れる模様

```
$ rails generate model <Model> [column1:type] [column2:type]...
$ rake db:migrate
```

* 仕組みはわからんが、生成されたModelクラスはカラムのgetter/setterが使える
* 命名規則があってModelは頭文字が大文字で単数、テーブル名は複数形。
 * すごいのはPersonとpeopleの対比、やるじゃん
* モデルはコントローラから宣言なく使える？なんで？
* rails consoleなる機能でDBの中を確認できる、つよい
 