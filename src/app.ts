class Department {
  // private readonly id: string;
  // private name: string;

  protected emploees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  describes(this: Department) {
    console.log("describes: " + this.id + " " + this.name);
  }
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
}

class AccountDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "Account");
    this.reports = reports;
  }

  addEmployee(emploee: string) {
    if (emploee === "Max") {
      return;
    }
    this.emploees.push(emploee);
  }

  addReport(report: string) {
    this.reports.push(report);
  }
  printReports() {
    console.log(this.reports);
  }
}

const ItDep = new ItDepartment("d1", ["John"]);

ItDep.describes();

// const accauntingCopy = {name: "AccauntingCopy", describes: accaunting.describes };
// accauntingCopy.describes();

ItDep.addEmployee("John");
ItDep.addEmployee("Max");
// accaunting.emploees[2] = "Anna";
ItDep.showEmployees();
console.log(ItDep);

const AcDep = new AccountDepartment("d2", []);

AcDep.addReport("first report");
AcDep.printReports();

AcDep.addEmployee("Max");
AcDep.addEmployee("Nick");
AcDep.showEmployees();
