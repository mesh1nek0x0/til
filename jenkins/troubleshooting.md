# troubleshooting

## RESTAPIでjobをkickすると500エラー
### 解決
jobにパラメータ付きbuildのチェックを入れる

### 原因
パラメータ付きbuildの設定をしていないjobをパラメータ付きbuildでkickしようとした。

これはクライアント側のエラーだと思うけどな...。