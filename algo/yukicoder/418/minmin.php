<?php
$S = trim(fgets(STDIN));
echo preg_match_all('/(mi)-*n/', $S), PHP_EOL;
