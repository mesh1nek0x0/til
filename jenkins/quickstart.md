# quickstart

## [local]<->[jenkins on docker-my/image]編

### 方針
2系のjenkinsをdocker上に展開して、pipeline as codeを試してみよう。

環境構築...ということでdockerfile書いてみる？

公式のdockerfile見た感じ、結構難しそうですね。

* jdkがいる
* yumでもいれられる
 * 公式docker imageはwarファイルをdlして配置する感じ
 * javaははまると大変なのでやめよう、素直に公式イメージを使います

```
### 公式イメージを使ってコンテナを立ち上げる
$ docker run -d -p 8080:8080 jenkins
4f91050c8c109969f191b960c408531b6b0001cf8698de417a97a2002aa89675

### ここでlocalhost:8080にアクセスするとパスワードが/var/...にあるというので...
$ docker exec -it 4f9 /bin/bash
jenkins@4f91050c8c10:/$ cat /var/jenkins_home/secrets/initialAdminPassword
80a2764ce1194a96a705b5f56dd6ef50
```

jobのPipelineに以下を定義して実行すると
```
node {
   echo 'Hello World'
}
```

結果は以下のとおり
```
Started by user msh1neko
[Pipeline] node
Running on master in /var/jenkins_home/workspace/test
[Pipeline] {
[Pipeline] echo
Hello World
[Pipeline] }
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```