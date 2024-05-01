function Logger0(constructor: Function) {
  console.log("logging");
  console.log(constructor);
}

function Logger(param: string) {
  return function (_: Function) {
    console.log(param);
  };
}

function WithTemplate(template: string, hookId: string) {
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
