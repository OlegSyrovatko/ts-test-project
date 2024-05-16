"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("models/drag-drop-interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("decorators/autobind-decorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
    function autobind(_, _2, descriptor) {
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
    exports.autobind = autobind;
});
define("state/project", ["require", "exports", "models/project"], function (require, exports, project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projState = exports.ProjectState = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstace() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, desription, numOfPeople) {
            const newProject = new project_js_1.Project(Math.random().toString(), title, desription, numOfPeople, project_js_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.projState = ProjectState.getInstace();
});
define("components/base-components", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor(templateId, hostElementId, insertedAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId)
                this.element.id = newElementId;
            this.attach(insertedAtStart);
        }
        attach(insertAtBegining) {
            this.hostElement.insertAdjacentElement(insertAtBegining ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("components/project-item", ["require", "exports", "decorators/autobind-decorator", "components/base-components"], function (require, exports, autobind_decorator_js_1, base_components_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_components_js_1.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            return `${this.project.people} persons `;
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) { }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    exports.ProjectItem = ProjectItem;
    __decorate([
        autobind_decorator_js_1.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        autobind_decorator_js_1.autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
});
define("components/project-list", ["require", "exports", "models/project", "decorators/autobind-decorator", "state/project", "components/base-components", "components/project-item"], function (require, exports, project_js_2, autobind_decorator_js_2, project_js_3, base_components_js_2, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_components_js_2.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.element.id = `${this.type}-projects`;
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            event.preventDefault();
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const prId = event.dataTransfer.getData("text/plain");
            project_js_3.projState.moveProject(prId, this.type === "active" ? project_js_2.ProjectStatus.Active : project_js_2.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            project_js_3.projState.addListener((projects) => {
                const relevantProjects = projects.filter((proj) => {
                    if (this.type === "active") {
                        return proj.status === project_js_2.ProjectStatus.Active;
                    }
                    return proj.status === project_js_2.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new project_item_js_1.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    exports.ProjectList = ProjectList;
    __decorate([
        autobind_decorator_js_2.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_decorator_js_2.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_decorator_js_2.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validates = void 0;
    function validates(validateInput) {
        let isValid = true;
        if (validateInput.required) {
            isValid = isValid && validateInput.value.toString().trim().length !== 0;
        }
        if (validateInput.minLength != null &&
            typeof validateInput.value === "string") {
            isValid =
                isValid && validateInput.value.trim().length >= validateInput.minLength;
        }
        if (validateInput.maxLength != null &&
            typeof validateInput.value === "string") {
            isValid =
                isValid && validateInput.value.trim().length <= validateInput.maxLength;
        }
        if (validateInput.min != null && typeof validateInput.value === "number") {
            isValid = isValid && validateInput.value >= validateInput.min;
        }
        if (validateInput.max != null && typeof validateInput.value === "number") {
            isValid = isValid && validateInput.value <= validateInput.max;
        }
        return isValid;
    }
    exports.validates = validates;
});
define("components/project-input", ["require", "exports", "util/validation", "decorators/autobind-decorator", "components/base-components", "state/project"], function (require, exports, validation_js_1, autobind_decorator_js_3, base_components_js_3, project_js_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_components_js_3.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };
            if (!(0, validation_js_1.validates)(titleValidatable) ||
                !(0, validation_js_1.validates)(descriptionValidatable) ||
                !(0, validation_js_1.validates)(peopleValidatable)) {
                alert("Enter valid value, try again");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        clearsInput() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [tit, des, pep] = userInput;
                project_js_4.projState.addProject(tit, des, pep);
                this.clearsInput();
            }
        }
    }
    exports.ProjectInput = ProjectInput;
    __decorate([
        autobind_decorator_js_3.autobind
    ], ProjectInput.prototype, "submitHandler", null);
});
define("app", ["require", "exports", "components/project-list", "components/project-input"], function (require, exports, project_list_js_1, project_input_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_js_1.ProjectInput();
    new project_list_js_1.ProjectList("active");
    new project_list_js_1.ProjectList("finished");
});
var _a;
const e1 = {
    name: "Max",
    privileges: ["create server"],
    startDate: new Date(),
};
function add2(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
console.log(add2(4, 5));
const res = add2("Oleh", "Syrovatko");
console.log(res.split(" "));
function printEmployeeInfo(emp) {
    console.log("name: " + emp.name);
    if ("privileges" in emp) {
        console.log("privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("startDate: " + emp.startDate);
    }
}
class Car {
    drive() {
        console.log("dryving...");
    }
}
class Truck {
    drive() {
        console.log("dryving a truck...");
    }
    loadCargo(amount) {
        console.log("with weight: " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
printEmployeeInfo(e1);
printEmployeeInfo({ name: "Oleh", startDate: new Date() });
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            console.log(animal.type + " speed: " + speed);
            break;
        case "horse":
            speed = animal.runningSpeed;
            console.log(animal.type + " speed: " + speed);
    }
}
moveAnimal({ type: "bird", flyingSpeed: 10 });
moveAnimal({ type: "horse", runningSpeed: 7 });
const inputEl = document.getElementById("some-id");
if (inputEl) {
    inputEl.value = "...";
}
const ErrorBag = {
    email: "not valid email",
    username: "must  start with a capital character",
};
const fetchedUserData = {
    id: "2",
    name: "oleh",
    job: { title: "ceo", description: "aboute ceo" },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const UserInput = undefined;
const storedData = UserInput !== null && UserInput !== void 0 ? UserInput : "default";
console.log(storedData);
function addNumbers(num1, num2, showResult, resultPhrase) {
    const result = num1 + num2;
    if (showResult) {
        console.log(resultPhrase + result);
    }
    return result;
}
let n1;
n1 = 5;
const n2 = 5.5;
let resultPhrase = "Result is: ";
const printRes = true;
addNumbers(n1, n2, printRes, resultPhrase);
class Department {
    static createEmployee(name) {
        return { name };
    }
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.emploees = [];
    }
    addEmployee(emploee) {
        this.emploees.push(emploee);
    }
    showEmployees() {
        console.log(this.emploees.length);
        console.log(this.emploees);
    }
}
Department.fiscalYear = 2020;
class ItDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = [];
        this.admins = admins;
    }
    describe() {
        console.log("It department: " + this.id);
    }
}
class AccountDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No lastReport found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass a valid value");
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, "Account");
        this.reports = reports;
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountDepartment("d2", []);
        return this.instance;
    }
    describe() {
        console.log("Account department: " + this.id);
    }
    addEmployee(emploee) {
        if (emploee === "Max") {
            return;
        }
        this.emploees.push(emploee);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = report;
    }
    printReports() {
        console.log(this.reports);
    }
}
console.log(Department.createEmployee("test new Employee"));
console.log("static property: " + Department.fiscalYear);
const ItDep = new ItDepartment("d1", ["John"]);
ItDep.describe();
ItDep.addEmployee("John");
ItDep.addEmployee("Max");
ItDep.showEmployees();
console.log(ItDep);
const AcDep = AccountDepartment.getInstance();
console.log(AcDep);
AcDep.describe();
AcDep.mostRecentReport = "test setter Report";
AcDep.addReport("custom report");
console.log(AcDep.mostRecentReport);
AcDep.printReports();
AcDep.addEmployee("Max");
AcDep.addEmployee("Nick");
AcDep.showEmployees();
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role[Role["READ_ONLY"] = 5] = "READ_ONLY";
    Role[Role["AUTHOR"] = 200] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: "Oleh",
    age: 40,
    hobbies: ['sports', 'books'],
    role: Role.ADMIN
};
let favoriteActivities;
favoriteActivities = ["Sport", 5, true];
console.log(person.name);
console.log(person.role);
console.log(favoriteActivities[2]);
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result' + num);
}
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
let combineValues;
combineValues = add;
console.log(combineValues(8, 8));
addAndHandle(10, 20, (result) => { console.log(result); return result; });
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Oleh", hobbies: ["sports"] }, { age: 30 });
console.log(mergedObj);
function countAndDescribe(element) {
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
function keyInObject(obj, key) {
    return "value " + obj[key];
}
console.log(keyInObject({ name: "Oleh" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const dataStorage = new DataStorage();
dataStorage.addItem("Oleh");
dataStorage.addItem("John");
dataStorage.addItem("Max");
console.log(dataStorage.getItems());
dataStorage.removeItem("Max");
console.log(dataStorage.getItems());
const numStorage = new DataStorage();
const objStorage = new DataStorage();
objStorage.addItem({ name: "Oleh" });
objStorage.addItem({ name: "John" });
const maxObj = { name: "Max" };
objStorage.addItem(maxObj);
console.log(objStorage.getItems());
objStorage.removeItem(maxObj);
console.log(objStorage.getItems());
function createCourseGoal(title, desciption, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = desciption;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ["Oleh", "John"];
const pageAnnotation = {
    annotation: "Small page",
    numberPage: 1,
};
let usr1;
usr1 = {
    nameP: "Oleh",
    age: 40,
    greet(phrase) {
        console.log(phrase + " " + this.nameP);
    },
};
usr1.greet("Hi, I am");
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        console.log("Hi");
    }
}
let plus;
plus = (n1, n2) => {
    return n1 + n2;
};
let usr2;
usr2 = new Person();
let usr3;
usr3 = new Person("Mike");
usr3.greet("Hi, I am");
console.log(usr3);
console.log(plus(2, 2));
let userInput;
let userName;
userInput = 5;
userInput = "Oleh";
if (typeof userInput === "string") {
    userName = userInput;
}
const button = document.querySelector('#buttonId');
if (button) {
    button.addEventListener('click', () => {
        console.log('Click');
    });
}
function combine(num1, num2, resultConversation) {
    if (typeof num1 === "number" && typeof num2 === "number" || resultConversation === "asNumber") {
        return +num1 + +num2;
    }
    else {
        return num1.toString() + num2.toString();
    }
}
console.log(combine(30, 26, "asNumber"));
console.log(combine("30", "26", "asNumber"));
console.log(combine("Oleh", "Syrovatko", "asText"));
//# sourceMappingURL=bundle.js.map