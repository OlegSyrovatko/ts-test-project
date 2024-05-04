function Logger0(constructor: Function) {
  console.log("logging0");
  console.log(constructor);
}

function Logger(param: string) {
  return function (_: Function) {
    console.log("logger");
    console.log(param);
  };
}
/*
function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log("add h1");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}
*/
function WithTemplate(template: string, hookId: string) {
  console.log("template factory");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstractor: T
  ) {
    return class extends originalConstractor {
      constructor(..._: any[]) {
        super();
        console.log("add h1");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate("<h1>default name</h1>", "app")
@Logger0
@Logger("logging-argument")
class Person2 {
  name = "Oleh";

  constructor() {
    console.log("Creating Object");
  }
}

const pers = new Person2();
console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target);
  console.log("Property name: " + propertyName);
}
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log("name: " + name);
  console.log(descriptor);
}
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log("name: " + name);
  console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log("name: " + name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Price should be great than zero");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function Autobinder(
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message: string = "this works";
  @Autobinder
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const buttn = document.querySelector("button")!;
// buttn.addEventListener("click", p.showMessage.bind(p));
buttn.addEventListener("click", p.showMessage);
