type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
// interface ElevatedEmployee extends Admin, Employee { }

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add2(n1: Combinable, n2: Combinable) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

console.log(add2(4, 5));

type UnknownType = Admin | Employee;

function printEmployeeInfo(emp: UnknownType) {
  console.log("name" + emp.name);
  if ("privileges" in emp) {
    console.log("privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

printEmployeeInfo(e1);
