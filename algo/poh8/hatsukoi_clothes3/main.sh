#!/bin/bash
cat /dev/stdin | awk '{if($1 <= $2) {print 0} else {printf("%d", $1 - $2)}}'
