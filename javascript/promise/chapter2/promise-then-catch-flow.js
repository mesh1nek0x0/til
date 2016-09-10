"use strict";

function taskA() {
  console.log('taskA');
  // throw new Error('@taskA'); // これでもキャッチされるし
  // 本来はthrowしないでrejectすべきらしい
}

function taskB() {
  console.log('taskB');
  return Promise.reject("@taskB"); // Rejectedなpromiseオブジェクトのreturnもキャッチされる
}

function onRejected(error) {
  console.log('Catch Error: A or B', error);
}

function finalTask() {
  console.log('Final Task');
}

var promise = Promise.resolve();
promise
  .then(taskA)
  .then(taskB)
  .catch(onRejected)
  .then(finalTask);
