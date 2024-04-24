interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let usr1: Person;
usr1 = {
  name: "Oleh",
  age: 40,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

usr1.greet("Hi, I am");
