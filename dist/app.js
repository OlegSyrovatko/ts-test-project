"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.emploees = [];
    }
    describes() {
        console.log("describes: " + this.id + " " + this.name);
    }
    addEmployee(emploee) {
        this.emploees.push(emploee);
    }
    showEmployees() {
        console.log(this.emploees.length);
        console.log(this.emploees);
    }
}
const accaunting = new Department('d1', 'Accaunting');
accaunting.describes();
accaunting.addEmployee("Oleh");
accaunting.addEmployee("Max");
accaunting.showEmployees();
//# sourceMappingURL=app.js.map