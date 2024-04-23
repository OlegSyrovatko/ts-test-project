"use strict";
class Department {
    static createEmployee(name) {
        return { name };
    }
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.emploees = [];
    }
    addEmployee(emploee) {
        this.emploees.push(emploee);
    }
    showEmployees() {
        console.log(this.emploees.length);
        console.log(this.emploees);
    }
}
Department.fiscalYear = 2020;
class ItDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = [];
        this.admins = admins;
    }
    describe() {
        console.log("It department: " + this.id);
    }
}
class AccountDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No lastReport found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass a valid value");
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, "Account");
        this.reports = reports;
        this.reports = reports;
        this.lastReport = reports[0];
    }
    describe() {
        console.log("Account department: " + this.id);
    }
    addEmployee(emploee) {
        if (emploee === "Max") {
            return;
        }
        this.emploees.push(emploee);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = report;
    }
    printReports() {
        console.log(this.reports);
    }
}
console.log(Department.createEmployee("test new Employee"));
console.log("static property: " + Department.fiscalYear);
const ItDep = new ItDepartment("d1", ["John"]);
ItDep.describe();
ItDep.addEmployee("John");
ItDep.addEmployee("Max");
ItDep.showEmployees();
console.log(ItDep);
const AcDep = new AccountDepartment("d2", []);
AcDep.describe();
AcDep.mostRecentReport = "test setter Report";
AcDep.addReport("custom report");
console.log(AcDep.mostRecentReport);
AcDep.printReports();
AcDep.addEmployee("Max");
AcDep.addEmployee("Nick");
AcDep.showEmployees();
//# sourceMappingURL=app.js.map