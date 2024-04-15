var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role[Role["READ_ONLY"] = 5] = "READ_ONLY";
    Role[Role["AUTHOR"] = 200] = "AUTHOR";
})(Role || (Role = {}));
;
var person 
/*
 : {
 name: string;
 age: number;
 hobbies: string[]; // array
 // role: [number, string]; // tuple (fixed length)
 }
 */
= {
    name: "Oleh",
    age: 40,
    hobbies: ['sports', 'books'],
    // role: [2, 'author']
    role: Role.ADMIN
};
console.log(person.name);
console.log(person.role);
// {
//   id: string;
//   price: number;
//   tags: string[];
//   details: {
//     title: string;
//     description: string;
//   }
// }
