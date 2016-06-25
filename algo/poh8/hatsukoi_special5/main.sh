#!/bin/bash
# 切り上げを+0.999で乗り切るのはちょっとずるい
cat /dev/stdin | awk 'BEGIN{n = 0;} {if (NR == 1) {n = $1} else {printf("%d", ($1 / (n * 2) + 0.999))}}'
