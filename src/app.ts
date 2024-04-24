interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

// type Person = {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// };

let usr1: Person;
usr1 = {
  name: "Oleh",
  age: 40,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

usr1.greet("Hi, I am");

interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  // interface Greetable extends Named, Named2, Named3 {
  // interface Greetable {
  greet(phrase: string): void;
}

class Person implements Greetable {
  // class Person implements Greetable, Named {
  name: string;
  age = 30;
  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}
let plus: AddFn;
plus = (n1: number, n2: number) => {
  return n1 + n2;
};

let usr2: Greetable;
usr2 = new Person("John");
usr2.greet("Hi, I am");
console.log(usr2);
console.log(plus(2, 2));
