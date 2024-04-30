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

interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T) {
  let descriptText = "empty";
  if (element.length === 1) {
    descriptText = "Got 1 element";
  }
  if (element.length > 1) {
    descriptText = "Got " + element.length + " elements";
  }
  return [element, descriptText];
}
console.log(countAndDescribe(""));
console.log(countAndDescribe("h"));
console.log(countAndDescribe("high there"));
console.log(countAndDescribe([]));
console.log(countAndDescribe(["sport", "cooking"]));

function keyInObject<T extends object, U extends keyof T>(obj: T, key: U) {
  return "value " + obj[key];
}

console.log(keyInObject({ name: "Oleh" }, "name"));

class DataStorage<T extends string | number | boolean | object> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const dataStorage = new DataStorage<string>();
dataStorage.addItem("Oleh");
dataStorage.addItem("John");
dataStorage.addItem("Max");
console.log(dataStorage.getItems());
dataStorage.removeItem("Max");
console.log(dataStorage.getItems());

const numStorage = new DataStorage<number>();

const objStorage = new DataStorage<object>();
objStorage.addItem({ name: "Oleh" });
objStorage.addItem({ name: "John" });
const maxObj = { name: "Max" };
objStorage.addItem(maxObj);
console.log(objStorage.getItems());
objStorage.removeItem(maxObj);
console.log(objStorage.getItems());
