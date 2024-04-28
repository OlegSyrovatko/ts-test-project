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

type UnknownType = Admin | Employee;

function printEmployeeInfo(emp: UnknownType) {
  console.log("name: " + emp.name);
  if ("privileges" in emp) {
    console.log("privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

class Car {
  drive() {
    console.log("dryving...");
  }
}
class Truck {
  drive() {
    console.log("dryving a truck...");
  }
  loadCargo(amount: number) {
    console.log("with weight: " + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // if ("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }
}

console.log(add2(4, 5));
printEmployeeInfo(e1);
printEmployeeInfo({ name: "Oleh", startDate: new Date() });

useVehicle(v1);
useVehicle(v2);

interface Bird {
  flyingSpeed: number;
  type: "bird";
}
interface Horse {
  runningSpeed: number;
  type: "horse";
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      console.log(animal.type + " speed: " + speed);
      break;
    case "horse":
      speed = animal.runningSpeed;
      console.log(animal.type + " speed: " + speed);
  }
}

moveAnimal({ type: "bird", flyingSpeed: 10 });
moveAnimal({ type: "horse", runningSpeed: 7 });

// const inputEl = <HTMLInputElement>document.getElementById("some-id")!;
//const inputEl = document.getElementById("some-id") as HTMLInputElement;

// inputEl.value = "...";
const inputEl = document.getElementById("some-id");
if (inputEl) {
  (inputEl as HTMLInputElement).value = "...";
}
