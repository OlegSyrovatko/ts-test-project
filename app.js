function add(num1, num2, showResult, resultPhrase) {
    var result = num1 + num2;
    if (showResult) {
        console.log(resultPhrase + result);
    }
    return result;
}
var n1 = 5;
var n2 = 5.5;
var resultPhrase = "Result is: ";
var printResult = true;
add(n1, n2, printResult, resultPhrase);
