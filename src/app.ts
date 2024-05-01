// function Logger(constructor: Function) {
//   console.log("logging");
//   console.log(constructor);
// }

// @Logger

function Logger(param: string) {
  return function (constructor: Function) {
    console.log(param);
    console.log(constructor);
  };
}

@Logger("logging-argument")
class Person2 {
  name = "Max";

  constructor() {
    console.log("Creating Object");
  }
}

const pers = new Person2();
console.log(pers);
