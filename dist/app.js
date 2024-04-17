"use strict";
let userInput;
let userName;
userInput = 5;
userInput = "Oleh";
if (typeof userInput === "string") {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, code: code };
}
generateError("Some Error", 404);
//# sourceMappingURL=app.js.map