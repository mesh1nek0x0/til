<?php
    define('PRICE', 0);
    define('PER', 1);
    define('DISCOUNT', 2);

    $N = trim(fgets(STDIN));
    $p = [];
    // 購入した商品は1から指定するのでiは1~
    for ($i = 1; $i <= $N; $i++) {
        $p[$i] = explode(' ', trim(fgets(STDIN)));
    }

    $M = trim(fgets(STDIN));
    for ($i = 0; $i < $M; $i++) {
        list($productId, $amount) = explode(' ', trim(fgets(STDIN)));
        echo $p[$productId][PRICE] * $amount - (floor($amount / $p[$productId][PER]) * $p[$productId][DISCOUNT]), PHP_EOL;
    }
?>
