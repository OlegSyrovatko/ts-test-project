function Logger0(constructor: Function) {
  console.log("logging0");
  console.log(constructor);
}

function Logger(param: string) {
  console.log("logger");
  return function (_: Function) {
    console.log(param);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("add h1");
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
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
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Price should be great than zero");
    }
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
