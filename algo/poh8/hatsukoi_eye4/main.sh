#!/bin/bash
read n < /dev/stdin
m=`expr $n + 1`
a=`awk '(NR > 1){print $0}'`
echo $a | sed -e 's/ /\n/g' | sort -rn | sed -n `expr $m / 2`p

# TODO:2016/06/16 通らないテストケースがある...orz
