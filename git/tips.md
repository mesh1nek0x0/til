# gitコマンドのtips
## 特定のコミット間で変更があったファイルの一覧表示
git diff commitA commitB --name-onlyでできる！
```
$ git diff e6c6138dbbd2e 016f9f92cff7fa --name-only # masterだとダメだった...
bash/awk.md
docker/dockerfile.md
docker/hellofromjava/Dockerfile
docker/hellofromjava/src/Hello.java
docker/overview.md

$ git diff HEAD^ 016f9f92cff7fa --name-only # HEAD^いける模様
docker/hellofromjava/Dockerfile
docker/hellofromjava/src/Hello.java

$ git diff HEAD 016f9f92cff7fa --name-only # HEADはダメな模様
```
