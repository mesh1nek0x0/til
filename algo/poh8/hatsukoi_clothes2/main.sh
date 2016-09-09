#!/bin/bash
cat /dev/stdin | awk '{if ($2 % $1 == 0) {print "ok"} else {print "ng"}}'
