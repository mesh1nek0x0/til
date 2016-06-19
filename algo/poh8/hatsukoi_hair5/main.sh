#!/bin/bash
INPUT=`cat /dev/stdin`
IFS=$'\n'
set -- $INPUT
# for文はなぜか全ケース通らない。。。
for((i=1;i<=$1;i++)); do
  if [ $2 -eq $i ]; then
  echo -n "+"
else
  echo -n "-"
fi
done;
