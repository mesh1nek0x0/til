# apacheでよく使うコマンド

## version確認
```
### dockerでサクッと立てて
$ docker run -dit --name my-apache-app -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4
fba263f6807358494c4df478b1113247e31547fa0a336e33f389e69798476812
$ docker exec -it fba /bin/bash
# /usr/local/apache2/bin/apachectl -v    
Server version: Apache/2.4.25 (Unix)
Server built:   Dec 22 2016 20:19:48
```
