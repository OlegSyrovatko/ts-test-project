"use strict";
class Department {
    constructor(n) {
        this.emploees = [];
        this.name = n;
    }
    describes() {
        console.log("describes: " + this.name);
    }
    addEmployee(emploee) {
        this.emploees.push(emploee);
    }
    showEmployees() {
        console.log(this.emploees.length);
        console.log(this.emploees);
    }
}
const accaunting = new Department('Accaunting');
accaunting.addEmployee("Oleh");
accaunting.addEmployee("Max");
accaunting.showEmployees();
//# sourceMappingURL=app.js.map