'use strict';

var array = [1, 2, 3, 3, 2, 2, 5];

/**
 * Array.prototype.filter()
 *
 * filterは与えられたcallbackに対して
 * 配列の各要素を実行し、それらに合格した配列要素からなる
 * 新しい配列を生成する
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 **/

// e.g. 2より大きい要素を抽出
console.log(
  array.filter((element, index) => {
    return (element > 2);
  })
);

// e.g. 重複を削除
console.log(
  array.filter((element, index, self) => {
    // INFO indexOfは要素の場所を返します(0~)
    // つまり、最初に見つかったものだけ合格 -> 重複を削除
    return self.indexOf(element) === index;
  })
);

// e.g. 重複している値をとりたい
console.log(
  array.filter((element, index, self) => {
    // 単純に重複削除の条件反転だけでは、意図する値にならない
    // e.g.
    // self.indexOf(1)は0だが、indexは0
    // self.indexOf(2)は1だが、indexは1 -> passしたい
    // self.indexOf(3)は2だが、indexは2 -> passしたい
    // self.indexOf(3)は2だが、indexは3 -> pass
    // self.indexOf(2)は1だが、indexは4 -> pass
    // self.indexOf(2)は1だが、indexは5 -> pass
    // self.indexOf(5)は6だが、indexは6 -> pass
    // 特定の要素に対して、最初に見つかったindexと
    // 最後から探して見つかったindexが異なる場合、
    // 複数、同じ値が存在することになるので
    return self.indexOf(element) !== self.lastIndexOf(element);
  })
);

// e.g. 重複している値をユニークにしたい
console.log(
  array.filter((element, index, self) => {
    // 重複している値の最初の要素だけとればよい
    return self.indexOf(element) === index && self.indexOf(element) !== self.lastIndexOf(element);
  })
);


// extra
var watch = ['I','II','III','IIII','V','VI','VII','VIII','IX','X','XI','XII'];
var S1 = 'X';

// この書き方はちょっとイケテナイ
// Object.keysで元の配列のindexの配列ができているので
// filter((key) => {...})という書き方がでも一見違和感がないが
// 正式にはelementなので、勘違いを生みやすい
console.log(
  Object.keys(watch).filter( (key) => {
    return watch[key] === S1;
  })[0]
);
// むしろこれでOKである
console.log(watch.indexOf(S1));
