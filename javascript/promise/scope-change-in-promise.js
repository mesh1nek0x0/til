'use strict'

class Hoge{
  constructor() {
    this.foo = 'Hoge scope';
  }
  
  doSomething() {
    return new Promise(function (resolve) {
      resolve(this.foo);
    });
  }
  
  doSomethingWithArrow() {
    return new Promise((resolve) => {
      resolve(this.foo);
    });
  }
}

let hoge = new Hoge();
console.log(hoge.doSomethingWithArrow());
// TypeError: Cannot read property 'foo' of undefined
//console.log(hoge.doSomething());