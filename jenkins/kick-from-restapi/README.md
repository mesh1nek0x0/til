# how to kick job from rest api
jenkinsで用意されているrest apiを利用してjobをkickしてみよう

※環境はdockerで用意済みで、テスト用のjobの用意済みとする

## RESTAPIでパラメータを受け取るには
* job側で受け取るパラメータの設定が必要
* パラメータはjsonの配列でkey:valueの形式で指定する
 * 空ではPOSTできない
 * POSTで送る場合、リモートからビルドのチェックはいらない
* pipelineではparams.<key>で参照できる模様

```
### userというパラメータにhogetarouを指定する場合
curl -X POST http://user:pass@localhost:8080/job/test/build --data-urlencode json='{"parameter": [{"name":"user", "value":"hogetarou"}]}'

### パラメータを空で送信する場合 ※なしにはできない模様
curl -X POST http://user:pass@localhost:8080/job/test/build --data-urlencode json='{"parameter": []}'
```

cf. https://support.cloudbees.com/hc/en-us/articles/218889337-How-to-build-a-job-using-the-REST-API-and-cURL