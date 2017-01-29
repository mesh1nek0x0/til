# git logコマンドのtips

## 変更した内容も表示する-p
```
$ git log -p | head -20 | grep -v @ # grev -v @でメールアドレスを除去
commit faef83bbbfb81be73b4dbf8cd74eef511b1260c2
Date:   Sun Jan 29 11:13:44 2017 +0900

    study css/multiple specify

diff --git a/css/tips.md b/css/tips.md
index 2a126ac..9e28489 100644
--- a/css/tips.md
+++ b/css/tips.md
 .<class> {
   border-collapse: collapse;
 }
+```
+
+## 要素の複数指定
+カンマ区切りで複数指定できます
+```
+td. tr {
```