"use strict";
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Oleh", hobbies: ["sports"] }, { age: 30 });
console.log(mergedObj);
function countAndDescribe(element) {
    let descriptText = "empty";
    if (element.length === 1) {
        descriptText = "Got 1 element";
    }
    if (element.length > 1) {
        descriptText = "Got " + element.length + " elements";
    }
    return [element, descriptText];
}
console.log(countAndDescribe(""));
console.log(countAndDescribe("h"));
console.log(countAndDescribe("high there"));
console.log(countAndDescribe([]));
console.log(countAndDescribe(["sport", "cooking"]));
function keyInObject(obj, key) {
    return "value " + obj[key];
}
console.log(keyInObject({ name: "Oleh" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const dataStorage = new DataStorage();
dataStorage.addItem("Oleh");
dataStorage.addItem("John");
dataStorage.addItem("Max");
console.log(dataStorage.getItems());
dataStorage.removeItem("Max");
console.log(dataStorage.getItems());
const numStorage = new DataStorage();
const objStorage = new DataStorage();
objStorage.addItem({ name: "Oleh" });
objStorage.addItem({ name: "John" });
const maxObj = { name: "Max" };
objStorage.addItem(maxObj);
console.log(objStorage.getItems());
objStorage.removeItem(maxObj);
console.log(objStorage.getItems());
function createCourseGoal(title, desciption, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = desciption;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ["Oleh", "John"];
const pageAnnotation = {
    annotation: "Small page",
    numberPage: 1,
};
//# sourceMappingURL=app-generics.js.map