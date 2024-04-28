interface Person {
  nameP: string;
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
  nameP: "Oleh",
  age: 40,
  greet(phrase: string) {
    console.log(phrase + " " + this.nameP);
  },
};

usr1.greet("Hi, I am");

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  // interface Greetable extends Named, Named2, Named3 {
  // interface Greetable {
  greet(phrase: string): void;
}

class Person implements Greetable {
  // class Person implements Greetable, Named {
  name?: string;
  age = 30;
  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    }
    console.log("Hi");
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
usr2 = new Person();
let usr3: Greetable;
usr3 = new Person("Mike");
usr3.greet("Hi, I am");
console.log(usr3);
console.log(plus(2, 2));
