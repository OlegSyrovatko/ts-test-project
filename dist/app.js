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
class ItDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = [];
        this.admins = admins;
    }
}
class AccountDepartment extends Department {
    constructor(id, reports) {
        super(id, "Account");
        this.reports = reports;
        this.reports = reports;
    }
    addReport(report) {
        this.reports.push(report);
    }
    printReports() {
        console.log(this.reports);
    }
}
const ItDep = new ItDepartment("d1", ["John"]);
ItDep.describes();
ItDep.addEmployee("John");
ItDep.addEmployee("Max");
ItDep.showEmployees();
console.log(ItDep);
const AcDep = new AccountDepartment("d2", []);
AcDep.addReport("first report");
AcDep.printReports();
//# sourceMappingURL=app.js.map