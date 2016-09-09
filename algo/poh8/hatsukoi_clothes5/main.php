<?php

/**
 * Class CardManager
 *
 * カードの強さと各カードの残り枚数の管理
 */
class CardManager {

    /**
     * @var array 在庫
     */
    private $cards = [];

    /**
     * @var array カードの強さ
     */
    private $lank  = [
        "2"  => 13,
        "A"  => 12,
        "K"  => 11,
        "Q"  => 10,
        "J"  => 9,
        "10" => 8,
        "9"  => 7,
        "8"  => 6,
        "7"  => 5,
        "6"  => 4,
        "5"  => 3,
        "4"  => 2,
        "3"  => 1,
    ];

    /**
     * コンストラクタ
     *
     * @param $stock 各種類の最大枚数
     */
    public function CardManager($stock) {
        foreach ($this->lank as $key => $value) {
            $this->cards[$key] = $stock;
        }
    }

    /**
     * 各カードの在庫表示
     *
     * for debug
     */
    public function showStock()
    {
        var_dump($this->cards);
    }

    /**
     * 在庫の中で一番強いカードの種類を取得
     *
     * @return string
     * @throws Exception
     */
    private function getStrongest() {
        foreach ($this->cards as $key => $value) {
          if ($value > 0) return $key;
        }
        throw new Exception("Sorry...No Card Stock.");
    }

    /**
     * 在庫を減らします
     *
     * @param $key 減らしたいカードの種類
     * @throws Exception
     */
    public function reduceStock($key) {
        if (array_key_exists($key, $this->cards) === false) {
            throw new Exception("Sorry...No Such Card");
        }

        if ($this->cards[$key] > 0) {
            $this->cards[$key]--;
        } else {
            throw new Exception("Sorry...Cant Reduce No Stock Card");
        }
    }

    /**
     * カードの強さ判定
     *
     * @param $onField 場にあるカードの種類
     * @param $next 次に出されるカード種類
     * @return string 結果
     * @throws Exception
     */
    public function judge($onField, $next) {
        if ($onField === 0) {
            // 前ターンで場が流れた時
            // INFO:先に在庫を減らすと、最強カードの値が変わってしまうため
            $strongest = $this->getStrongest();
            $this->reduceStock($next);
            // この時点で最強のカードなら最初のカードですが、また場を流す
            return ($next == $strongest) ? "FIRST-RESET" : "FIRST-WIN";
        }
        if ($this->lank[$next] <= $this->lank[$onField]) {
            // 同じ値もPASSになる
            return "SKIP";
        } else {
            // INFO:先に在庫を減らすと、最強カードの値が変わってしまうため
            $strongest = $this->getStrongest();
            $this->reduceStock($next);
            return ($next == $strongest) ? "RESET" : "WIN";
        }
    }
}

/**
 * Class PlayerManager
 *
 * 勝ち抜けた順などプレイヤーの管理
 */
class PlayerManager {
    /**
     * @var プレイ人数
     */
    private $MAX_PLAYER;

    /**
     * @var 進行ターン
     */
    private $turn;

    /**
     * @var array プレイヤーの情報
     */
    private $players = [];

    /**
     * @var まだ勝ち抜けてないプレイヤーの数
     */
    public $restPlayerNum;

    /**
     * コンストラクタ
     */
    public function __construct() {
        $cards = explode(" ", trim(fgets(STDIN)));
        $this->restPlayerNum = $this->MAX_PLAYER = count($cards);
        foreach ($cards as $value) {
            $this->players[] = [
                // 0はランク未決定
                "rank" => 0,
                "hand" => $value,
            ];
        }
    }

    /**
     * まだ勝ち抜けてない次の人のカードを知らせます。
     *
     * @return string
     */
    public function getNextCard() {
        while ($this->players[$this->turn % $this->MAX_PLAYER]["rank"] != 0) {
            // まだ抜けてない人まで飛ばしていきます
            $this->turn++;
        }
        return $this->players[$this->turn % $this->MAX_PLAYER]["hand"];
    }

    /**
     * 順番を進めます
     */
    public function pass() {
        $this->turn++;
    }

    /**
     * 現在の順番のプレイヤーを勝ち抜けさせます
     */
    public function winOut() {
        $this->restPlayerNum--;
        $rank = $this->MAX_PLAYER - $this->restPlayerNum;
        $this->players[$this->turn % $this->MAX_PLAYER]["rank"] = $rank;
        $this->turn++;
    }

    /**
     * 最終的な勝ち抜け結果を表示します
     */
    public function showResult() {
        foreach ($this->players as $player => $value) {
            echo $value["rank"], PHP_EOL;
        }
    }
}


$pm = new PlayerManager();
$cm = new CardManager(4);
$field = 0;
while ($pm->restPlayerNum > 0) {
    // 勝ち抜けてない人の次のカードは...
    $card = $pm->getNextCard();
    $judge = $cm->judge($field, $card);

    // パス？勝てる？場は流れる？
    switch ($judge) {
        case "SKIP":
            $pm->pass();
            break;
        case "WIN":
        case "FIRST-WIN":
            $field = $card;
            $pm->winOut();
            break;
        case "RESET":
        case "FIRST-RESET":
            $field = 0;
            $pm->winOut();
            break;
        default :
            throw new Exception("No Expected Switch...");
    }
}
$pm->showResult();
