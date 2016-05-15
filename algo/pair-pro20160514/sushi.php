<?php

$cnt = trim(fgets(STDIN));
$v   = explode(' ', trim(fgets(STDIN)));

$pastSushi = array(0, 0, 0);

for ($i = 0; $i < $cnt; $i++) {
    array_push($pastSushi, max($pastSushi[0] + $v[$i], $pastSushi[1] + $v[$i]));
    array_shift($pastSushi);
}

echo max($pastSushi), PHP_EOL;
