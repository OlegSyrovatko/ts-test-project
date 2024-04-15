function combine(
    num1: number | string,
    num2: number | string,
    resultConversation: "asNumber" || "asText"
    ) {
        if (typeof num1 === "number" && typeof num2 === "number" || resultConversation === "asNumber") {
            return +num1 + +num2;
        } else { 
            return num1.toString() + num2.toString();
        }

    }
 

console.log(combine(30, 26, "asNumber"));
console.log(combine("30", "26", "asNumber"));
console.log(combine("Oleh", "Syrovatko", "asText"));