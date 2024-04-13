function add(num1: number, num2: number, showResult: boolean, resultPhrase: string) {

    const result = num1 + num2;
    if (showResult) { 
        console.log(resultPhrase + result);
    }
    return result;
}
 
const n1 = 5;
const n2 = 5.5;
const resultPhrase = "Result is: "
const printResult = true;
    
add(n1, n2, printResult, resultPhrase);
