<?php
    $m = fgets(STDIN);
    $n = fgets(STDIN);

    $dp = [0];

    for ($i = 0; $i < $n; $i++) {
        list($q, $r) = explode(" ", fgets(STDIN));
        // 既存のリストそれぞれに足しあげて更新
        foreach ($dp as $key => $value) {
            if (array_key_exists($key + $q, $dp)) {
                // すでに最小値がメモられていれば更新
                $dp[$key + $q] = min($dp[$key + $q], $value + $r);
            } else {
                // 新規追加
                $dp[$key + $q] = $value + $r;
            }
        }
    }

    $target = [];
    foreach ($dp as $q => $r) {
        if ($q >= $m) {
            $target[] = $r;
        }
    }
    echo min($target);
