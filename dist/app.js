"use strict";
class Department {
    constructor(n) {
        this.name = n;
    }
    describes() {
        console.log("describes: " + this.name);
    }
}
const accaunting = new Department('Accaunting');
accaunting.describes();
const accauntingCopy = { name: "AccauntingCopy", describes: accaunting.describes };
accauntingCopy.describes();
//# sourceMappingURL=app.js.map