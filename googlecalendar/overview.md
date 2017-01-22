# googleカレンダーAPIの利用

## ざっくり
* 管理画面から利用設定が必要
* クライアントライブラリが公式から提供されている
* OAuth2のプロトコルに則る
* slackとかで連携する程度ならわざわざAPIを利用しなくてもいい

## CalendarAPIの連携手順(nodejs)
UIはきっと変わるので流れをふんわり
* Google Developer Consoleからプロジェクトを作成する
* CalendarAPIの利用を有効にする
* プロジェクトの認証設定からOAuthで設定を行う
 * クライアントID/シークレットが表示される（あとから確認も可能）
 * 同時にサービスアカウントが発行される
* カレンダーの共有設定にサービスアカウントのメールアドレスを追加
 * カレンダーへのパーミッション設定も必要です
 * 保存を押すのをお忘れなく
* コードを書きましょう

cf. https://developers.google.com/google-apps/calendar/quickstart/nodejs