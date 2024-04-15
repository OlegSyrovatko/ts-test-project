const person: {
    name: string;
    age: number;
    hobbies: string[]; // array
    role: [number, string]; // tuple (fixed length)
} = {
    name: "Oleh",
    age: 40,
    hobbies: ['sports', 'books'],
    role: [2, 'author']
}

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