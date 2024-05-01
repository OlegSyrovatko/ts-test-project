function Logger(constructor: Function) {
  console.log("logging");
  console.log(constructor);
}

@Logger
class Person2 {
  name = "Max";

  constructor() {
    console.log("Creating Object");
  }
}

const pers = new Person2();
console.log(pers);
