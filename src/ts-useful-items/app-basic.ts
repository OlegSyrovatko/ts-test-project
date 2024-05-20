function addNumbers(num1: number, num2: number, showResult: boolean, resultPhrase: string) {

    const result = num1 + num2;
    if (showResult) { 
        console.log(resultPhrase + result);
    }
    return result;
}
 
let n1: number;
n1 = 5;
const n2 = 5.5;
let resultPhrase = "Result is: ";
const printRes = true;
    
addNumbers(n1, n2, printRes, resultPhrase);
