<?php

$n = trim(fgets(STDIN));

$etos = array();

for ($i = 0; $i < $n; $i++) {
    $etos[] = trim(fgets(STDIN));
}

$cnt = count($etos);
$max = max(array_count_values($etos));

if ($max <= (($cnt + 1) / 2)) {
    echo "YES", PHP_EOL;
} else {
    echo "NO", PHP_EOL;
}


