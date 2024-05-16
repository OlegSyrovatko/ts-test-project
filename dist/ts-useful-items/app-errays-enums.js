"use strict";
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role[Role["READ_ONLY"] = 5] = "READ_ONLY";
    Role[Role["AUTHOR"] = 200] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: "Oleh",
    age: 40,
    hobbies: ['sports', 'books'],
    role: Role.ADMIN
};
let favoriteActivities;
favoriteActivities = ["Sport", 5, true];
console.log(person.name);
console.log(person.role);
console.log(favoriteActivities[2]);
//# sourceMappingURL=app-errays-enums.js.map