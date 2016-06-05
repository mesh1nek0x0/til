# node.js on Dockerの作業ログ
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

手順に沿って実行してみます。

```
# コピペしなかった、えらい

$ touch package.json
$ vim package.json

$ vim server.js
$ vim server.js

$ touch Dockerfile
$ vim Dockerfile
$ cat Dockerfile
FROM node:argon

# Create app Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependences
COPY package.json /usr/app/src
RUN npm install

# bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD ["npm", "start"]

# docker環境と接続します
$ docker-machine env default
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/iida-ryota/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval $(docker-machine env default)
$ eval $(docker-machine env default)

# エラーになったよ
local-mesh1neko:docker iida-ryota$ docker build -t mesh1neko/node-web-app .
Sending build context to Docker daemon 4.096 kB
Step 1 : FROM node:argon
 ---> 1f9967dbfc82
Step 2 : RUN mkdir -p /usr/src/app
 ---> Using cache
 ---> 4167dc742a96
Step 3 : WORKDIR /usr/src/app
 ---> Using cache
 ---> b40fe8681469
Step 4 : COPY package.json /usr/app/src
 ---> d50307efa865
Removing intermediate container 6b472f5c02ae
Step 5 : RUN npm install
 ---> Running in 8eeefee7d769
npm info it worked if it ends with ok
npm info using npm@2.15.5
npm info using node@v4.4.5
npm ERR! install Couldn't read dependencies
npm ERR! Linux 4.4.8-boot2docker
npm ERR! argv "/usr/local/bin/node" "/usr/local/bin/npm" "install"
npm ERR! node v4.4.5
npm ERR! npm  v2.15.5
npm ERR! path /usr/src/app/package.json
npm ERR! code ENOPACKAGEJSON
npm ERR! errno -2
npm ERR! syscall open

npm ERR! package.json ENOENT: no such file or directory, open '/usr/src/app/package.json'
npm ERR! package.json This is most likely not a problem with npm itself.
npm ERR! package.json npm can't find a package.json file in your current directory.

npm ERR! Please include the following file with any support request:
npm ERR!     /usr/src/app/npm-debug.log
The command '/bin/sh -c npm install' returned a non-zero code: 254

# no such file or directory, open '/usr/src/app/package.json' らしいので
# どうもDockerfileの記述が間違っているっぽい
# Install app dependencesのCOPY欄が間違っていのでfix

# 中途半端な？イメージができていたので一旦綺麗にする
local-mesh1neko:docker iida-ryota$ docker images
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
<none>                   <none>              d50307efa865        7 minutes ago       647.2 MB
<none>                   <none>              6b6747590615        11 hours ago        647.2 MB
node                     latest              72d4ec634f1f        30 hours ago        649.7 MB
node                     argon               1f9967dbfc82        11 days ago         647.2 MB

$ docker rmi d50
Error response from daemon: conflict: unable to delete d50307efa865 (must be forced) - image is being used by stopped container 361136b9ad44
$ docker stop 361
361
$ docker rm 361
361
$ docker rmi d50
Deleted: sha256:d50307efa8656cbcada08d8f51063f7a7b404e3764415e4b7728884f660b1064
Deleted: sha256:a853545cea41e260b812e59a6992ff766d4bc9c033ea06cd137ba86c941cd47b
$ docker rmi 6b6
Deleted: sha256:6b6747590615109f9b408134c1c0eda744dd347b83546161995f6018ff9f1f4c
Deleted: sha256:37561101c6c2ba2d0e8b28bc1ed08f31eba011e6961efd938043b6856e4aa7dc
Deleted: sha256:b40fe86814698e61c2426cf8438fe1e01d87f8cc612ccf23b84f894bd5115fbe
Deleted: sha256:4167dc742a96fb8b87e00518433f2ba6379648a23ede8ebbfe088031a775c61a
Deleted: sha256:4cf6f90e93a8fb4e8edbf44e4d57bf2e266ab4fb6ea69dc2a0eae11b2c116522
$ docker rmi 72d
Untagged: node:latest
Deleted: sha256:72d4ec634f1f24ae2afbc4a1b482865fb3ad5e6575750d335249ce3be612deea
Deleted: sha256:2b400056f3b1931e206f7199cdfe8f4e667c13e03486929f485706611a49626c
Deleted: sha256:4788afcf0498408eac0c5341173a36492f555f06636fda07a661ef03535db1a6

# 再度imageをbuildします
$ docker build -t mesh1neko/node-web-app .
Sending build context to Docker daemon 4.096 kB
Step 1 : FROM node:argon
 ---> 1f9967dbfc82
Step 2 : RUN mkdir -p /usr/src/app
 ---> Running in c6aba9d6d730
 ---> ae442ec49610
Removing intermediate container c6aba9d6d730
Step 3 : WORKDIR /usr/src/app
 ---> Running in 14ce23669de7
 ---> c61dd5996ffb
Removing intermediate container 14ce23669de7
Step 4 : COPY package.json /usr/src/app
 ---> 5293d9f38c00
Removing intermediate container c1b866d43c9f
Step 5 : RUN npm install
 ---> Running in 8edf88c4a981
npm info it worked if it ends with ok
npm info using npm@2.15.5
npm info using node@v4.4.5
npm WARN package.json docker_web_app@1.0.0 No repository field.
npm WARN package.json docker_web_app@1.0.0 No README data
npm WARN package.json docker_web_app@1.0.0 No license field.
...
# 略
...
npm info ok
 ---> 51b78af35824
Removing intermediate container 8edf88c4a981
Step 6 : COPY . /usr/src/app
 ---> 396154b23e72
Removing intermediate container 1ff38bdae176
Step 7 : EXPOSE 8080
 ---> Running in 234a4131ed8b
 ---> 5cd1e51925f6
Removing intermediate container 234a4131ed8b
Step 8 : CMD npm start
 ---> Running in 017c9810af64
 ---> 8f4d338333fb
Removing intermediate container 017c9810af64
Successfully built 8f4d338333fb
$ docker images
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
mesh1neko/node-web-app   latest              8f4d338333fb        4 seconds ago       650.5 MB
node                     argon               1f9967dbfc82        11 days ago         647.2 MB

# 無事にbuildできました
# コンテナ立てます
$ docker run -p 49160:8080 -d mesh1neko/node-web-app
4f1dd028853ba754103cca71f1bcb04b19f27791b551cb34843cd157864b3224

# ちゃんと起動してるっぽい
$ docker logs 4f1
npm info it worked if it ends with ok
npm info using npm@2.15.5
npm info using node@v4.4.5
npm info prestart docker_web_app@1.0.0
npm info start docker_web_app@1.0.0

> docker_web_app@1.0.0 start /usr/src/app
> node server.js

Runninng on http://localhost:8080

# アクセスしてみる、よしよし
$ curl -i `docker-machine ip default`:49160
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-8O9wgeFTmsAO9bdhtPsBsw"
Date: Sun, 05 Jun 2016 01:21:31 GMT
Connection: keep-alive

Hello world

# そういえば、再起動しないと反映されない...みたいなのを試してみます。
$ docker exec -it 4f1 /bin/bash
---@container
# sed -i -e 's/world/node.js/g' server.js
# exit
---
$ curl -i `docker-machine ip`:49160
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-8O9wgeFTmsAO9bdhtPsBsw"
Date: Sun, 05 Jun 2016 01:36:07 GMT
Connection: keep-alive

Hello world
# 変わっていない

# コンテナを起動し直してみます
$ docker stop 4f1
4f1
$ docker start 4f1
4f1
$ curl -i `docker-machine ip`:49160
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 14
ETag: W/"e-Z1AL02sZlIfIRRElhDggBA"
Date: Sun, 05 Jun 2016 01:40:14 GMT
Connection: keep-alive

Hello node.js

# ちゃんんとかわってますね！
# とりあえず、Dockerでnodeの環境を立てることはできたので完了!
```
