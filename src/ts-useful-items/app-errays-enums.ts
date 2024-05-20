enum Role { ADMIN = "admin", READ_ONLY = 5, AUTHOR = 200 };

const person
   /* 
    : {
    name: string;
    age: number;
    hobbies: string[]; // array
    // role: [number, string]; // tuple (fixed length)
    }
    */
    =
{
    name: "Oleh",
    age: 40,
    hobbies: ['sports', 'books'],
    // role: [2, 'author']
    role: Role.ADMIN
}



let favoriteActivities: any[];
favoriteActivities = ["Sport", 5, true];


console.log(person.name);
console.log(person.role);
console.log(favoriteActivities[2]);
// {
//   id: string;
//   price: number;
//   tags: string[];
//   details: {
//     title: string;
//     description: string;
//   }
// }