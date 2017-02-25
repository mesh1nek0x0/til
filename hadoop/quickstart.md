# quickstart on docker
docker runでサクッと試せるやつあった

## まずはサンプル通りに

```
$ docker run -it sequenceiq/hadoop-docker:2.7.0 /etc/bootstrap.sh -bash

### mapreduceの実行　inputからdfs[a-z.]+にマッチする内容をoutputにgrepする
bash-4.1# bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.0.jar grep input output 'dfs[a-z.]+'


17/02/25 08:22:13 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032
17/02/25 08:22:15 INFO input.FileInputFormat: Total input paths to process : 31
17/02/25 08:22:15 INFO mapreduce.JobSubmitter: number of splits:31
...(ry
17/02/25 08:23:43 INFO mapreduce.Job:  map 45% reduce 12%
17/02/25 08:23:44 INFO mapreduce.Job:  map 52% reduce 12%
17/02/25 08:23:45 INFO mapreduce.Job:  map 52% reduce 17%
17/02/25 08:23:58 INFO mapreduce.Job:  map 61% reduce 17%
17/02/25 08:23:59 INFO mapreduce.Job:  map 65% reduce 17%
17/02/25 08:24:00 INFO mapreduce.Job:  map 68% reduce 20%
...(ry

### 結果はこういう風に出すみたい
bash-4.1# bin/hdfs dfs -cat output/*
6       dfs.audit.logger
4       dfs.class
3       dfs.server.namenode.
2       dfs.period
2       dfs.audit.log.maxfilesize
2       dfs.audit.log.maxbackupindex
1       dfsmetrics.log
1       dfsadmin
1       dfs.servers
1       dfs.replication
1       dfs.file
```

## お次は自分で指定してみる

```
bash-4.1# bin/hadoop fs -ls -R /
drwxr-xr-x   - root supergroup          0 2015-05-16 05:42 /user
drwxr-xr-x   - root supergroup          0 2015-05-16 05:43 /user/root
drwxr-xr-x   - root supergroup          0 2015-05-16 05:43 /user/root/input
...(ry

### hadoopのhdfs上にデータを乗っける
bash-4.1# echo "hoge foo bar" > test.txt
bash-4.1# cat test.txt
hoge foo bar
bash-4.1# bin/hadoop fs -put test.txt input/
bash-4.1# bin/hadoop fs -ls -R input/ | grep test
-rw-r--r--   1 root supergroup         13 2017-02-25 10:22 input/test.txt

### mapreduceでwordcountする
bash-4.1# bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.0.jar wordcount input/test.txt output/
17/02/25 10:25:42 INFO client.RMProxy: Connecting to ResourceManager at /0.0.0.0:8032
17/02/25 10:25:43 INFO input.FileInputFormat: Total input paths to process : 1
17/02/25 10:25:44 INFO mapreduce.JobSubmitter: number of splits:1
17/02/25 10:25:44 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_1488036082709_0001
17/02/25 10:25:44 INFO impl.YarnClientImpl: Submitted application application_1488036082709_0001
17/02/25 10:25:44 INFO mapreduce.Job: The url to track the job: http://619e7c5c1d86:8088/proxy/application_1488036082709_0001/
17/02/25 10:25:44 INFO mapreduce.Job: Running job: job_1488036082709_0001
17/02/25 10:25:54 INFO mapreduce.Job: Job job_1488036082709_0001 running in uber mode : false
17/02/25 10:25:54 INFO mapreduce.Job:  map 0% reduce 0%
17/02/25 10:26:01 INFO mapreduce.Job:  map 100% reduce 0%
17/02/25 10:26:08 INFO mapreduce.Job:  map 100% reduce 100%
17/02/25 10:26:08 INFO mapreduce.Job: Job job_1488036082709_0001 completed successfully
...(ry
  
### 結果を確認する
bash-4.1# bin/hadoop fs -cat output/*
    hoge    1
    foo     1
    bar     1
```

できた！