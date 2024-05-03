"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger0(constructor) {
    console.log("logging0");
    console.log(constructor);
}
function Logger(param) {
    console.log("logger");
    return function (_) {
        console.log(param);
    };
}
function WithTemplate(template, hookId) {
    console.log("add h1");
    return function (constructor) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = p.name;
        }
    };
}
let Person2 = class Person2 {
    constructor() {
        this.name = "Oleh";
        console.log("Creating Object");
    }
};
Person2 = __decorate([
    WithTemplate("<h1>default name</h1>", "app"),
    Logger0,
    Logger("logging-argument")
], Person2);
const pers = new Person2();
console.log(pers);
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Price should be great than zero");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
//# sourceMappingURL=app.js.map