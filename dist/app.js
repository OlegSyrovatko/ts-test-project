"use strict";
const e1 = {
    name: "Max",
    privileges: ["create server"],
    startDate: new Date(),
};
function add2(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
function printEmployeeInfo(emp) {
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
    loadCargo(amount) {
        console.log("with weight: " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
console.log(add2(4, 5));
printEmployeeInfo(e1);
printEmployeeInfo({ name: "Oleh", startDate: new Date() });
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
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
//# sourceMappingURL=app.js.map