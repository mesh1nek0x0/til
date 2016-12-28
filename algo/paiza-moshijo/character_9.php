<?php
    $max = $A = trim(fgets(STDIN));
    $digits = strlen($A);

    for ($i = 0; $i <= $digits; $i++) {
        // ' 'を文頭に足して最初に見つかった場合に0になるのを防ぐ
        if (preg_match('/[5-9]/', ' '. strrev($A), $matches, PREG_OFFSET_CAPTURE) === 0) {
            break;
        }
        // 最初のhitしかレスポンスにないため[0][1], [0][0]は固定
        $i = $matches[0][1] - 1; // 先ほど足した空行分を戻す
        $max = $A = $A + (10 - $matches[0][0]) * ('1'.str_repeat('0', $i));
    }
    echo $max, PHP_EOL;
    
