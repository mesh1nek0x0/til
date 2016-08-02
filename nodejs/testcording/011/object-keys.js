var arr = ["a", "b", "c"];
console.log(Object.keys(arr));

var obj = {0: "a", 1: "b", 2: "c"};
console.log(Object.keys(obj));

var an_obj = {100: "a", 2: "b", 7: "c"};
console.log(Object.keys(an_obj));

var my_obj = Object.create({}, {
  getFoo : {
    value : function () {
      return this.foo;
    }
  }
});
my_obj.foo = 1;

console.log(Object.keys(my_obj));

console.log(Object.getOwnPropertyNames(my_obj));
