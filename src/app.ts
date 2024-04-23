abstract class Department {
  // private readonly id: string;
  // private name: string;

  static fiscalYear = 2020;
  protected emploees: string[] = [];

  static createEmployee(name: string) {
    return { name };
  }
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
    //  console.log(Department.fiscalYear); // for static properties
  }

  abstract describe(this: Department): void;

  addEmployee(emploee: string) {
    this.emploees.push(emploee);
  }
  showEmployees() {
    console.log(this.emploees.length);
    console.log(this.emploees);
  }
}

class ItDepartment extends Department {
  admins: string[] = [];

  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("It department: " + this.id);
  }
}

class AccountDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No lastReport found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass a valid value");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Account");
    this.reports = reports;
    this.lastReport = reports[0];
  }

  describe() {
    console.log("Account department: " + this.id);
  }

  addEmployee(emploee: string) {
    if (emploee === "Max") {
      return;
    }
    this.emploees.push(emploee);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }
  printReports() {
    console.log(this.reports);
  }
}

console.log(Department.createEmployee("test new Employee")); // static method
console.log("static property: " + Department.fiscalYear);

const ItDep = new ItDepartment("d1", ["John"]);
ItDep.describe();
ItDep.addEmployee("John");
ItDep.addEmployee("Max");
ItDep.showEmployees();
console.log(ItDep);

const AcDep = new AccountDepartment("d2", []);
AcDep.describe();
AcDep.mostRecentReport = "test setter Report"; // setter
AcDep.addReport("custom report");

console.log(AcDep.mostRecentReport); // getter
AcDep.printReports();

AcDep.addEmployee("Max");
AcDep.addEmployee("Nick");
AcDep.showEmployees();

// const accauntingCopy = {name: "AccauntingCopy", describes: accaunting.describes };
// accauntingCopy.describes();

// accaunting.emploees[2] = "Anna";
