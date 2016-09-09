# lessのtips
ページングして中をざっと見るときにお世話になるlessくん。

## -N(--LINE-NUMBERS)
行番号をつけて表示
```
# こんな長いファイルもちゃんと行がつくよ
$ wc -l test.jtl
  100200 test.jtl
$ less -N test.jtl
1 timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,grpThreads,allThreads,Latency
1 ,IdleTime
2 1465112636872,98,sample,200,OK,スレッドグループ 1-1,text,true,,213,1,1,98,0
3 1465112636972,1,sample,200,OK,スレッドグループ 1-1,text,true,,213,1,1,1,0
```

## -S(--chop-long-lines)
見切れたところは表示せずに１行で出す

```
$ less -N -S test.jtl
1 timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,grpThreads,allThreads,Latency
2 1465112636872,98,sample,200,OK,スレッドグループ 1-1,text,true,,213,1,1,98,0
```
