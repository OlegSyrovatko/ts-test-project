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
//# sourceMappingURL=app.js.map