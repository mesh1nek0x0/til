<?php
list($n, $p) = explode(" ", fgets(STDIN));
list($m, $q) = explode(" ", fgets(STDIN));

# ペンは小数点以下でもあれば追加で１本は必ず必要です。
echo $n*$p + ceil($n/$m) * $q;
