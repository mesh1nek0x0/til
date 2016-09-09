<?php
    list($n, $m) = explode(' ', fgets(STDIN));
    $s = trim(fgets(STDIN));
    $t = trim(fgets(STDIN));

    $stock = [];
    $first = str_split($s, 1);

    foreach ($first as $value) {
        if (array_key_exists($value, $stock)) {
            $stock[$value]++;
        } else {
            $stock[$value] = 1;
        }
    }

    $retake = 0;
    $second = str_split($t, 1);
    foreach ($second as $value) {
        if (array_key_exists($value, $stock) && $stock[$value] > 0) {
            $stock[$value]--;
        } else {
            $retake++;
        }
    }

    echo $retake, PHP_EOL;
