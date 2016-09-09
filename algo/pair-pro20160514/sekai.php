<?php

list($a, $b) = explode(" ", fgets(STDIN));

for ($i = $a; $i <= $b; $i++) {
    if ($i % 3 === 0) {
        echo $i, PHP_EOL;
        continue;
    }
    if (strpos('0'.$i, '3') >= 1) {
        echo $i, PHP_EOL;
        continue;
    }
}
