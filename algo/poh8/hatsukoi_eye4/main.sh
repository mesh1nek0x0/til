#!/bin/bash
# 前回までは標準入力の取り方とsedで行を出すのがよくなかった模様
INPUT=`cat --`
IFS=$'\n'
set -- $INPUT
CENTER=$(( ($1+1)/2 ))
echo $2 | sed -e 's/\s/\n/g' | sort -rn | tail -n $CENTER | head -1
