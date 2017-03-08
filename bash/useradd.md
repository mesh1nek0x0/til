# useraddのtips
ユーザ追加でおなじみコマンド

## ログインさせないユーザを作る
app実行ユーザとかでログインできるのはセキュリティとしてよろしくないよね！

```
$ useradd -s /bin/false -m appuser
```

sshコンテナで試してみます
```
$ docker run -d --name ssh -p 10022:22 million12/ssh
622fc06ac798ef58fc13bbb2488c5210253779b7f4b3ab0c5eed136bb58c4f78
$ docker exec -it ssh /bin/bash
### login不可ユーザ
# useradd -s /bin/false -m appuser
# passwd appuser
Changing password for user appuser.
New password:
BAD PASSWORD: The password is shorter than 8 characters
Retype new password:
passwd: all authentication tokens updated successfully.

### loginユーザ
# useradd -m sshuser
# passwd sshuser
Changing password for user sshuser.
New password:
BAD PASSWORD: The password is shorter than 8 characters
Retype new password:
passwd: all authentication tokens updated successfully.

# ls -l /home/
total 8
drwx------ 2 appuser appuser 4096 Mar  4 07:50 appuser
drwx------ 2 sshuser sshuser 4096 Mar  4 07:51 sshuser
# exit

### ちゃんとログインできる
$ ssh sshuser@localhost -p 10022
sshuser@localhost's password:
Last failed login: Sat Mar  4 07:58:15 UTC 2017 from 172.17.0.1 on ssh:notty
There was 1 failed login attempt since the last successful login.
Last login: Sat Mar  4 07:51:51 2017
[sshuser@622fc06ac798 ~]$ exit
logout
Connection to localhost closed.

### ログインが途中終わってしまいます
$ ssh appuser@localhost -p 10022
appuser@localhost's password:
Last login: Sat Mar  4 07:52:03 2017
Connection to localhost closed.

### 後片付け
$ docker stop ssh && docker rm -v ssh
ssh
ssh
```
