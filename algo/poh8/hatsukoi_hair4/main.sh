#!/bin/bash
# またしてもawk
cat /dev/stdin | awk 'BEGIN{i=0}{if($1 == $2) {i++}} END{if(i>=3) {print "OK"} else {print "NG"}}'
