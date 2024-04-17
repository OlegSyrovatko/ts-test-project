"use strict";
function addNumbers(num1, num2, showResult, resultPhrase) {
    const result = num1 + num2;
    if (showResult) {
        console.log(resultPhrase + result);
    }
    return result;
}
let n1;
n1 = 5;
const n2 = 5.5;
let resultPhrase = "Result is: ";
const printRes = true;
addNumbers(n1, n2, printRes, resultPhrase);
//# sourceMappingURL=app-basic.js.map