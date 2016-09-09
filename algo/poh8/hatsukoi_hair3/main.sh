#!/bin/bash
# これもbashというかawkである
cat /dev/stdin | awk '{if($1 % 7 == 0){print "lucky"} else {print "unlucky"}}'
