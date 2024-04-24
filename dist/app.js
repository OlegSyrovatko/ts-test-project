"use strict";
let usr1;
usr1 = {
    name: "Oleh",
    age: 40,
    greet(phrase) {
        console.log(phrase + " " + this.name);
    },
};
usr1.greet("Hi, I am");
class Person {
    constructor(n) {
        this.age = 30;
        this.name = n;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
}
let usr2;
usr2 = new Person("John");
usr2.greet("Hi, I am");
console.log(usr2);
//# sourceMappingURL=app.js.map