/*
const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout((){
    resolve("10");
  }, 2000)
});
 
promise.then(data => { data.split(" "); })
*/

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Oleh", hobbies: ["sports"] }, { age: 30 });

console.log(mergedObj);
