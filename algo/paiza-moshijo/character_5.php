<?php
    $codeMapping = explode(' ', trim(fgets(STDIN)));
    $rCodeMapping = array_flip($codeMapping);

    $s = trim(fgets(STDIN));
    $t = str_split(trim(fgets(STDIN)));
    $ans = '';
    switch ($s) {
        case 'encode':
            foreach ($t as $key => $value) {
                $ans = $ans . $codeMapping[$value];
            }
            break;
        case 'decode':
            foreach ($t as $key => $value) {
                $ans = $ans . $rCodeMapping[$value];
            }
            break;
        default:
            throw new Exception('unknown error');
            break;
    }
    echo $ans, PHP_EOL;
?>
