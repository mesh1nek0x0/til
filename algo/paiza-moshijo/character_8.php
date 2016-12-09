<?php
    list($c, $p) = explode(' ', trim(fgets(STDIN)));
    $absolutePath = explode('/', $c);
    $absolutePath[0] = '/';
    $cd = explode('/', $p);

    $pwd = count($absolutePath) - 1;
    foreach($cd as $N => $next) {
        switch ($next) {
            case '..':
                // rootはこれ以上あがれない
                if ($pwd === 0) continue;
                $pwd--;
                break;
            case '.':
                continue;
                break;
            default:
                // その階層のディレクトリを上書き
                $pwd++;
                $absolutePath[$pwd] = $next;
                break;
        }
    }
    for ($i = 0; $i <= $pwd; $i++) {
        echo ($i <= 1) ? $absolutePath[$i] : '/' . $absolutePath[$i];
    }
    echo PHP_EOL;
