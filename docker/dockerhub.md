# dockerhub周りのメモ
## automatic build
* わりと時間かかる
* 無料でもできる

1. 先にgithub/bitbucketと連携しておく必要がある
 * -> Linked Accounts & Services
1. 右上部の[Create]から[Create Automated Build]を選択
1. 自動構築したいリポジトリを選択
1. どのリポジトリのpushをトリガーにどのタグを作るか設定する

### 自動構築の履歴
[Build Detail](https://hub.docker.com/r/mesh1neko/docker-java/builds/)というところでビルドの履歴が見れる。
