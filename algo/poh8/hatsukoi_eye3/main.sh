#!/bin/bash
# BEGIN, END句から行は参照できない。よく考えればそうだ。
cat /dev/stdin | awk 'BEGIN{p=0;} {if($1 >= 1000) p += 10;} {p+=int($1/100)} END{print p}'
