# overview
Jave製のOSSでbuild, test, deployをやってのけるjobサーバ。

いわずとしれたjenkinsおじさん。動物でも女の子でもない独自路線。

![jenkins](https://jenkins.io/images/226px-Jenkins_logo.svg.png)

## 公式
https://jenkins.io/

2017/02/26時点の最新は2.47がlatest.

最初は2011年（forkされたので、源流はもう少し早い）

## 特徴
* jobを繋げられるので、だいたいなんでもできる
 * jobの繋がりはpipelineという
 * 1.x系まではGUIによる設定が多かったため、職人が生まれた
 * 2系からはpipeline as codeでjenkinsfileが使える
* パッケージを入れることで拡張性ある
 * Jenkinsサーバとしてパッケージのバージョンがあがるため、利用範囲がアップデートは要注意
* OSSなのでお金かからない
* デフォルトポートは8080、50000ポートはslaveとの通信用
* master/slaveで分散buildが可能
* なんたって無料OSSで汎用性が高いため、情報が多い
* 時間やwebhookなどをトリガーに開始して、自身も次のトリガーになれる
* リリースサイクルがあり、安定版とweeklyリリース版がある