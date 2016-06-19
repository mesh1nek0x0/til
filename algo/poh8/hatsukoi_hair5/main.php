<?php
    $S = fgets(STDIN);
    $t = fgets(STDIN);

    for ($i = 1; $i <= $S; $i++) {
        echo ($i == $t) ? "+" : "-";
    }
