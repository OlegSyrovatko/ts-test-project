"use strict";
let usr1;
usr1 = {
    nameP: "Oleh",
    age: 40,
    greet(phrase) {
        console.log(phrase + " " + this.nameP);
    },
};
usr1.greet("Hi, I am");
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        console.log("Hi");
    }
}
let plus;
plus = (n1, n2) => {
    return n1 + n2;
};
let usr2;
usr2 = new Person();
let usr3;
usr3 = new Person("Mike");
usr3.greet("Hi, I am");
console.log(usr3);
console.log(plus(2, 2));
//# sourceMappingURL=app.js.map