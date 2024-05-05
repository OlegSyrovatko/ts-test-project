"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger0(constructor) {
    console.log("logging0");
    console.log(constructor);
}
function Logger(param) {
    return function (_) {
        console.log("logger");
        console.log(param);
    };
}
function WithTemplate(template, hookId) {
    console.log("template factory");
    return function (originalConstractor) {
        return class extends originalConstractor {
            constructor(..._) {
                super();
                console.log("add h1");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
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
    console.log(target);
    console.log("Property name: " + propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log("name: " + name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log("name: " + name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log("name: " + name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Price should be great than zero");
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function Autobinder(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
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
    constructor() {
        this.message = "this works";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobinder
], Printer.prototype, "showMessage", null);
const p = new Printer();
const buttn = document.querySelector("button");
buttn.addEventListener("click", p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop])
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const docForm = document.querySelector("form");
docForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title0");
    const priceEl = document.getElementById("price0");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert("Invalide input. Try again");
        return;
    }
    console.log(createCourse);
});
//# sourceMappingURL=app.js.map