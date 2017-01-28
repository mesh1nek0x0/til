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

### 補助コマンド:rake routes
routingを確認できるコマンド
```
$ rake routes
Prefix Verb URI Pattern      Controller#Ac
tion
   top GET  /top(.:format)   home#top
 about GET  /about(.:format) home#about
```