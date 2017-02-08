<?php
    $N = trim(fgets(STDIN));
    $c = explode(' ', trim(fgets(STDIN)));
    $r = explode(' ', trim(fgets(STDIN)));
    for ($i = 0; $i < $N; $i++) {
        $ans = '';
        for ($j = 0; $j < $N; $j++) {
            $ans = $ans . ($r[$i] + $c[$j]) . ' ';
        }
        // remove last space.
        echo substr($ans, 0, -1), PHP_EOL;
    }
?>
