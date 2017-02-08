# commitに関するtips

## 直前のcommitを編集する
前提としてpushする前です！

直前のcommitを編集し、commitHashが変わります
```
$ git log | head -n 7 | grep -v Author
commit 54b49bce48336436416de6dceaa1b91f0f79795a
Date:   Sun Jan 1 12:29:35 2017 +0900

    study git amend
    * add git/commit.md

$ git add commit.md
$ git commit --amend
[master f47714f] study git amend * add git/commit.md * fix git/commit.md
 Date: Sun Jan 1 12:29:35 2017 +0900
 1 file changed, 12 insertions(+)
 create mode 100644 git/commit.md
$ git log | head -n 7 | grep -v Author
commit f47714f7fd95bf63499f3a30d7642f97da4e0c75
Date:   Sun Jan 1 12:29:35 2017 +0900

    study git amend
    * add git/commit.md
    * fix git/commit.md
```
