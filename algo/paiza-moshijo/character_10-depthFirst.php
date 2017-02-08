<?php
define('DIRECTION_RIGHT', 0);
define('DIRECTION_UP', 1);
define('DIRECTION_LEFT', 2);
define('DIRECTION_DOWN', 3);

/**
 * Class Vector
 * x, yを配列より扱いやすい
 */
class Vector {
    public $x;
    public $y;

    public function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;
    }
}

/**
 * Class Map
 * ダンジョンの情報と踏破のチェック
 */
class Map {
    private $mapInfo = [];
    private $H;
    private $W;


    public function __construct() {
        list($this->H, $this->W, $N) = explode(' ', trim(fgets(STDIN)));

        // ダンジョン生成
        $this->mapInfo = [];
        for ($i = 0; $i < $this->H; $i++) {
            $g = str_split(trim(fgets(STDIN)));
            for ($j = 0; $j < $this->W; $j++) {
                $this->mapInfo[$i][$j] = [
                    'visited' => false,
                    'tip'     => $g[$j],
                ];
            }
        }
    }

    /**
     * 指定の位置のダンジョンの具体的な情報欲しい
     *
     * @param $x
     * @param $y
     * @return string
     * @throws Exception
     */
    public function getMapStatus($x, $y) {
        // ダンジョン外なら壁扱い
        if ($x < 0 || $y < 0 || $x >= $this->W || $y >= $this->H) {
            return '#';
        }
        // y:row, x:column
        if (!array_key_exists($x, $this->mapInfo[$y])) throw new Exception('y:'.$y.',x:'. $x. 'is not in array key');
        return ($this->mapInfo[$y][$x]['visited'] === false) ? $this->mapInfo[$y][$x]['tip'] : '#';
    }

    /**
     * 踏破済みマークつけるよ
     *
     * @param Vector $position
     */
    public function visited(Vector $position)
    {
        // yが行, xが列なのでy->xの順
        $this->mapInfo[$position->y][$position->x]['visited'] = true;
    }

    /**
     * 未踏破の道を配列でGET
     *
     * @param Vector $position
     * @return array
     * @throws Exception
     */
    public function getUnvisitedWay(Vector $position) {
        $unvisitedWays = [];
        for ($i = 0; $i < 4; $i++) {
            switch ($i) {
                case DIRECTION_RIGHT:
                    $x = $position->x + 1;
                    $y = $position->y;
                    break;
                case DIRECTION_UP:
                    $x = $position->x;
                    $y = $position->y - 1;
                    break;
                case DIRECTION_LEFT:
                    $x = $position->x - 1;
                    $y = $position->y;
                    break;
                case DIRECTION_DOWN:
                    $x = $position->x;
                    $y = $position->y + 1;
                    break;
                default:
                    throw new Exception('unknown direction');
            }

            if ($this->getMapStatus($x, $y) != '#') {
                $unvisitedWays[] = new Vector($x, $y);
            }
        }
        return $unvisitedWays;
    }
}


/**
 * Class Cat
 *
 * ダンジョンを歩くのを猫にした
 */
class Cat {

    /**
     * @var Map
     */
    private $map;

    /**
     * @var Vector 最初はst, sy
     */
    private $nowPosition;

    /**
     * @var Vector tx, ty
     */
    private $treasurePosition;

    /**
     * 猫は地図を読めるんだ
     *
     * @param Map $map
     */
    public function __construct(Map $map) {
        $this->map = $map;
        list($sx, $sy) = explode(' ', trim(fgets(STDIN)));
        list($tx, $ty) = explode(' ', trim(fgets(STDIN)));
        // 地図は0基点で生成しているため-1します
        $this->nowPosition = new Vector($sx - 1, $sy - 1);
        $this->treasurePosition = new Vector($tx - 1, $ty - 1);
    }


    /**
     * 指定位置から次のルートを考えます
     *
     * @param Vector $position
     * @return mixed
     */
    private function thinkNextWayFrom(Vector $position) {
        if ($position == $this->treasurePosition) return [$position];
        $this->map->visited($position);
        $ways = $this->map->getUnvisitedWay($position);

        foreach ($ways as $nextPosition) {
            // 再帰して深さ優先探索する
            $result = $this->thinkNextWayFrom($nextPosition);
            if ($result !== false) {
                array_unshift($result, $position);
                return $result;
            }
        }
        // ここまできたら見つからない（行き止まり）
        return false;
    }

    /**
     * 全体のルートを考えてます
     */
    public function thinkRoute() {
        $route = $this->thinkNextWayFrom($this->nowPosition);
        if ($route !== false) {
            for ($i = 0; $i < count($route) - 1; $i++) {
                $x = $route[$i + 1]->x - $route[$i]->x;
                $y = $route[$i + 1]->y - $route[$i]->y;
                switch ($x.','.$y) {
                    case '-1,0':
                        $way = 'L';
                        break;
                    case '1,0':
                        $way = 'R';
                        break;
                    case '0,-1':
                        $way = 'U';
                        break;
                    case '0,1':
                        $way = 'D';
                        break;
                }
                echo $way, PHP_EOL;
            }
        }
    }
}

$map = new Map();
$cat = new Cat($map);
$cat->thinkRoute();