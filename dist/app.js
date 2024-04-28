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
console.log(add2(4, 5));
function printEmployeeInfo(emp) {
    console.log("name" + emp.name);
    if ("privileges" in emp) {
        console.log("privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("startDate: " + emp.startDate);
    }
}
printEmployeeInfo(e1);
//# sourceMappingURL=app.js.map