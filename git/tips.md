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

## gitコマンドの補完と作業状態の表示
注:homebrewで入れている場合です

.bashrcを編集して以下を追記します
```
## これを使うと補完が効きます
source /usr/local/etc/bash_completion.d/git-prompt.sh
source /usr/local/etc/bash_completion.d/git-completion.bash

## 以下を追記すると作業状態がでます
GIT_PS1_SHOWDIRTYSTATE=true
export PS1='\h\[\033[00m\]:\W\[\033[31m\]$(__git_ps1 [%s])\[\033[00m\]\$ '
```

編集を終えたらsourceでパスの追加を反映します。
```
$ source .bashrc # これで補完が効きます、補完を試しながら作業状態の確認もしてみます
til[master]$ # こんな風に$の前に作業状態がでます。
til[master *]$ git status # 変更があると*がつきます。
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   git/tips.md
...
[master *]$ git add git/tips.md

[master +]$ git status # stageにaddされると+になります。
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   git/tips.md
...
[master +]$ git commit -m "[wip]fix git/tips.md" # commitすると
  [master b55ac7b] [wip]fix git/tips.md
   1 file changed, 19 insertions(+)
til[master]$ # マークは取れます
```
