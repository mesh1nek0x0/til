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

## macにgitが入っていたのをhomebrewに変更したい
homebrewをそのまま入れられるらしい

cf. [[qiita]MacのHomeBrewでGitを2.7.0にアップデートしよう](http://qiita.com/suzutan/items/44bcf20df711675c525c)

```
$ git --version
git version 2.7.4 (Apple Git-66)
$ brew install git
...
$ git --version
git version 2.7.4 (Apple Git-66) # この時点ではまだ/usr/bin/gitが優先されている
## .bash_profileを以下のように変更して以下の様になればOK
$ cat .bash_profile
export PATH=/usr/local/bin:$PATH
$ git --version
git version 2.6.0 # これでめでたくmacのgitからおさらばできた！
```

## 過去にcommit済みファイルのローカル変更を破棄する
```
$ git checkout [--] <file>
```

実はgit statusコマンドで優しく教えてくれていた

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   tips.md
```

はて？--は省略できるようだけど、これは一体何のパラメータなのか...

helpを読むと...

```
       git checkout [-p|--patch] [<tree-ish>] [--] <pathspec>...
           When <paths> or --patch are given, git checkout does not switch
           branches. It updates the named paths in the working tree from the
           index file or from a named <tree-ish> (most often a commit). In
           this case, the -b and --track options are meaningless and giving
           either of them results in an error. The <tree-ish> argument can be
           used to specify a specific tree-ish (i.e. commit, tag or tree) to
           update the index for the given paths before updating the working
           tree.
``

pathや--patchが指定された場合、ブランチはswitchしないよ。（そういえばcheckoutは元々そういうコマンドですね。

指定のコミットで該当ファイルだけ更新するから-bや--trackのオプションは意味なくなるわ...みたいなことを書いている。

```
### 試してみると確かにできない（同時にできんわエラー）
$ git checkout 48ed1d3d3947fbc7c40e31e41e49803911a0a379 tips.md -b test-branch
fatal: Cannot update paths and switch to branch 'test-branch' at the same time.
Did you intend to checkout 'git/tips.md' which can not be resolved as commit?
```

--の謎は解けない

仕方ないのでソースをみたところ、どうやらこれは区切り文字？のような扱いをしているようです。

--の位置やパラメータによって挙動を変えている感じのように見えますが、

基本的には--以降はpathを表すものだーと書いているようです。

cf. https://github.com/git/git/blob/6610af872f6494a061780ec738c8713a034b848b/builtin/checkout.c#L900-L964

-- 以降はpathだよ！という明示で納得、すっきり。

## 間違ってgit reset --hardしたのをなかったことにする
git reflogに履歴が残っているので、もう１回reset --hardでできるんです！！！

※事後のため結果は残っておらず...

```
$ git reflog -n 5
f3995a0 HEAD@{0}: reset: moving to HEAD@{1}
901d82e HEAD@{1}: reset: moving to 901d82ec2d5f4df80266afa1e1ae7f12882afba4 [83c23eac63338a0571e3554dd61ed045b0934b9d]
f3995a0 HEAD@{2}: commit: study javascript/hash tips
e111815 HEAD@{3}: commit: study js/array-max|min
cf7bbdf HEAD@{4}: commit: study js/string concat syntax sugar

### HEAD{1}が戻したいところならこんな感じ or 左端のcommit hash
$ git reset --hard HEAD@{1}
```

