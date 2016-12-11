<?php
define('LOG_LEVEL', 'NO');

// 方向を360度の円で考え、TURN_UNITの剰余の絶対値を地図上の向きとする
define('TURN_UNIT', 90);
define('TURN_AROUND', 360);
define('DIRECTION_RIGHT', 0);
define('DIRECTION_UP', 1);
define('DIRECTION_LEFT', 2);
define('DIRECTION_DOWN', 3);


define('MAX_ACTION', 10000000);
define('FORWARD_WAY', 0);
define('RIGHT_WAY', 1);
define('LEFT_WAY', 2);
define('NO_WAY', 3);


list($H, $W, $N) = explode(' ', trim(fgets(STDIN)));

// ダンジョン生成
$tmpMap = [];
for ($i = 0; $i < $H; $i++) {
    $g = str_split(trim(fgets(STDIN)));
    for ($j = 0; $j < $W; $j++) {
        $tmpMap[$i][$j] = $g[$j];
    }
}
loggerInfo($tmpMap);
// 地図の操作は複雑なので別クラスへ処理を移譲
$map = new Map($tmpMap, $H, $W);

list($sx, $sy) = explode(' ', trim(fgets(STDIN)));
list($tx, $ty) = explode(' ', trim(fgets(STDIN)));

loggerInfo([$sx, $sy]);
loggerInfo([$tx, $ty]);


// 地図は0,0で始まるためずらします
$nowPosition = new vector($sx - 1, $sy - 1);
$goalPosition = new vector($tx - 1, $ty - 1);
// 入り口から入るので進行方向はDOWN
$nowDirection = TURN_UNIT * DIRECTION_DOWN;

loggerDebug("before");
loggerDebug($nowPosition);

// ルートメモ
$route = [];

// 移動回数
$action = 0;

while ($action < MAX_ACTION) {
    $threeWayStatus = $map->get3wayStatus(
        $nowPosition,
        [
            // 進行方向 => 地図上の方向
            FORWARD_WAY => $nowDirection / TURN_UNIT,
            // TURN_AROUNDの剰余をしておけば、TURN_AROUNDを超えても0に戻る
            LEFT_WAY    => ($nowDirection + TURN_UNIT) % TURN_AROUND / TURN_UNIT,
            // TURN_AROUNDを加算して剰余しておけば、TURN_AROUNDを超えても0以上に戻る
            RIGHT_WAY   => ($nowDirection - TURN_UNIT + TURN_AROUND) % TURN_AROUND / TURN_UNIT,
        ]
    );

    loggerInfo($threeWayStatus);
    $nextWays = decideNextWays($threeWayStatus);
    loggerInfo($nextWays);

    switch ($nextWays['next']) {
        case FORWARD_WAY:
            $nowPosition = $map->getPositionByDirection($nowPosition, $nowDirection / TURN_UNIT);
            break;
        case RIGHT_WAY:
            $nowDirection = ($nowDirection - TURN_UNIT + TURN_AROUND) % TURN_AROUND;
            $nowPosition = $map->getPositionByDirection($nowPosition, $nowDirection / TURN_UNIT);
            break;
        case LEFT_WAY:
            $nowDirection = ($nowDirection + TURN_UNIT) % TURN_AROUND;
            $nowPosition = $map->getPositionByDirection($nowPosition, $nowDirection / TURN_UNIT);
            break;
        case NO_WAY:
            $nowDirection = ($nowDirection + TURN_UNIT * 2) % TURN_AROUND;
            $nowPosition = $map->getPositionByDirection($nowPosition, $nowDirection / TURN_UNIT);
            break;
    }
    loggerDebug($action.":after");
    loggerDebug($nowPosition);
    loggerDebug($nowDirection / TURN_UNIT);
    $memo[] = $nowDirection / TURN_UNIT;
    $action++;
    if ($nowPosition == $goalPosition) break;
}

loggerDebug("memo");
loggerDebug($memo);

foreach ($memo as $direction) {
    switch ($direction) {
        case DIRECTION_RIGHT:
            $route = 'R';
            break;
        case DIRECTION_UP:
            $route = 'U';
            break;
        case DIRECTION_LEFT:
            $route = 'L';
            break;
        case DIRECTION_DOWN:
            $route = 'D';
            break;
    }
    echo $route, PHP_EOL;
}

/**
 * @param $courseStatus
 * @return array
 */
function decideNextWays($courseStatus) {
    $criteria = preg_replace('/[a-zA-z]{1}/', '.', $courseStatus[FORWARD_WAY] . $courseStatus[RIGHT_WAY] . $courseStatus[LEFT_WAY]);
    switch($criteria) {
        case '...':
            $ways = [
                'next' => RIGHT_WAY,
                'anotherWays' => [
                    FORWARD_WAY,
                    LEFT_WAY,
                ]
            ];
            break;
        case '..#':
            $ways = [
                'next' => RIGHT_WAY,
                'anotherWays' => [
                    FORWARD_WAY,
                ]
            ];
            break;
        case '.#.':
            $ways = [
                'next' => FORWARD_WAY,
                'anotherWays' => [
                    LEFT_WAY,
                ]
            ];
            break;
        case '.##':
            $ways = [
                'next' => FORWARD_WAY
            ];
            break;
        case '#..':
            $ways = [
                'next' => RIGHT_WAY,
                'anotherWays' => [
                    LEFT_WAY,
                ]
            ];
            break;
        case '#.#':
            $ways = [
                'next' => RIGHT_WAY,
            ];
            break;
        case '##.':
            $ways = [
                'next' => LEFT_WAY,
            ];
            break;
        default:
            $ways = [
                'next' => NO_WAY,
            ];
            break;
    }
    return $ways;
}


class Map {
    /**
     * @var array
     */
    public $data;
    public $H;
    public $W;
    public function __construct($data, $h, $w) {
        $this->data = $data;
        $this->H = $h;
        $this->W = $w;
    }

    /**
     * @param $x
     * @param $y
     * @return string
     */
    public function getMapStatus($x, $y) {
        // ダンジョン外なら壁扱い
        if ($x < 0 || $y < 0 || $x >= $this->W || $y >= $this->H) {
            return '#';
        }
        // y:row, x:column
        return $this->data[$y][$x];
    }

    /**
     * @param vector $nowPosition
     * @param $direction
     * @return vector
     */
    public function getPositionByDirection(vector $nowPosition, $direction) {
        switch ($direction) {
            case DIRECTION_RIGHT:
                $nowPosition->x += 1;
                break;
            case DIRECTION_UP:
                $nowPosition->y -= 1;
                break;
            case DIRECTION_LEFT:
                $nowPosition->x -= 1;
                break;
            case DIRECTION_DOWN:
                $nowPosition->y += 1;
                break;
        }
        return $nowPosition;
    }

    /**
     * @param vector $nowPosition
     * @param array $directions
     * @return array
     */
    public function get3wayStatus(vector $nowPosition, $directions) {
        $threeWayStatus = [];
        foreach ($directions as $relative => $absolute) {
            switch ($absolute) {
                case DIRECTION_RIGHT:
                    $threeWayStatus[$relative] = $this->getMapStatus($nowPosition->x + 1, $nowPosition->y);
                    break;
                case DIRECTION_UP:
                    $threeWayStatus[$relative] = $this->getMapStatus($nowPosition->x, $nowPosition->y - 1);
                    break;
                case DIRECTION_LEFT:
                    $threeWayStatus[$relative] = $this->getMapStatus($nowPosition->x - 1, $nowPosition->y);
                    break;
                case DIRECTION_DOWN:
                    $threeWayStatus[$relative] = $this->getMapStatus($nowPosition->x, $nowPosition->y + 1);
                    break;
            }
        }
        return $threeWayStatus;
    }
}

class vector {
    public $x;
    public $y;
    function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;
    }

    public function setPosition($x, $y) {
        $this->x = $x;
        $this->y = $y;
    }
}


function loggerWarn($var) {
    if (LOG_LEVEL === 'WARN') {
        var_dump($var);
    }
}


function loggerDebug($var) {
    if (LOG_LEVEL === 'INFO' || LOG_LEVEL === 'DEBUG' || LOG_LEVEL === 'WARN') {
        var_dump($var);
    }
}

function loggerInfo($var) {
    if (LOG_LEVEL === 'INFO' || LOG_LEVEL === 'WARN') {
        var_dump($var);
    }
}
