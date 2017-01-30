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
* layoutの指定があればcontentsを書くだけで済みます。
 * <%= yield %>の部分にコンテンツが出力されます
 * stylesheet_link_tagやjavascript_include_tagでassetsの読み込みできるそうな
 * <%= form_tag do%><%end%>という楽な書き方でformがかける
```
Rails.application.routes.draw do
  # 「get '/top'」の部分を「root」を用いて書き換えてください
  root 'home#top' # root pathの指定
  
  get '/about' => 'home#about' # それ以外の指定
  
end
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