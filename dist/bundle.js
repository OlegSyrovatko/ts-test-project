/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-components.ts":
/*!*******************************************!*\
  !*** ./src/components/base-components.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
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


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectInput: () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _components_base_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/base-components */ "./src/components/base-components.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _components_base_components__WEBPACK_IMPORTED_MODULE_2__["default"] {
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
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_0__.validates(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_0__.validates(descriptionValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_0__.validates(peopleValidatable)) {
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
            _state_project__WEBPACK_IMPORTED_MODULE_3__.projState.addProject(tit, des, pep);
            this.clearsInput();
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectItem: () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _components_base_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/base-components */ "./src/components/base-components.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _components_base_components__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectList: () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind-decorator */ "./src/decorators/autobind-decorator.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
/* harmony import */ var _components_base_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/base-components */ "./src/components/base-components.ts");
/* harmony import */ var _components_project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _components_base_components__WEBPACK_IMPORTED_MODULE_3__["default"] {
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
        _state_project__WEBPACK_IMPORTED_MODULE_2__.projState.moveProject(prId, this.type === "active" ? _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        _state_project__WEBPACK_IMPORTED_MODULE_2__.projState.addListener((projects) => {
            const relevantProjects = projects.filter((proj) => {
                if (this.type === "active") {
                    return proj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return proj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
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
            new _components_project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind_decorator__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind-decorator.ts":
/*!**********************************************!*\
  !*** ./src/decorators/autobind-decorator.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autobind: () => (/* binding */ autobind)
/* harmony export */ });
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


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   ProjectStatus: () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project.ts":
/*!******************************!*\
  !*** ./src/state/project.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectState: () => (/* binding */ ProjectState),
/* harmony export */   projState: () => (/* binding */ projState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");

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
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, desription, numOfPeople, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
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
const projState = ProjectState.getInstace();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validates: () => (/* binding */ validates)
/* harmony export */ });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_1__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_0__.ProjectList("active");
new _components_project_list__WEBPACK_IMPORTED_MODULE_0__.ProjectList("finished");
console.log("lll");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dHMtdGVzdC8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50cy50cyIsIndlYnBhY2s6Ly90cy10ZXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly90cy10ZXN0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL3RzLXRlc3QvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vdHMtdGVzdC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLWRlY29yYXRvci50cyIsIndlYnBhY2s6Ly90cy10ZXN0Ly4vc3JjL21vZGVscy9wcm9qZWN0LnRzIiwid2VicGFjazovL3RzLXRlc3QvLi9zcmMvc3RhdGUvcHJvamVjdC50cyIsIndlYnBhY2s6Ly90cy10ZXN0Ly4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly90cy10ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RzLXRlc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzLXRlc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90cy10ZXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHMtdGVzdC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbi8vIFByb2plY3RCYXNlXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxcclxuICBUIGV4dGVuZHMgSFRNTEVsZW1lbnQsXHJcbiAgVSBleHRlbmRzIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICBob3N0RWxlbWVudDogVDtcclxuICBlbGVtZW50OiBVO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcclxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcclxuICAgIGluc2VydGVkQXRTdGFydDogYm9vbGVhbixcclxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgdGVtcGxhdGVJZFxyXG4gICAgKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXHJcbiAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgIGlmIChuZXdFbGVtZW50SWQpIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcclxuXHJcbiAgICB0aGlzLmF0dGFjaChpbnNlcnRlZEF0U3RhcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2goaW5zZXJ0QXRCZWdpbmluZzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgIGluc2VydEF0QmVnaW5pbmcgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsXHJcbiAgICAgIHRoaXMuZWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xyXG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxufVxyXG4vLyB9XHJcbiIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4uL3V0aWwvdmFsaWRhdGlvbi50c1wiIC8+XHJcbi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmQtZGVjb3JhdG9yLnRzXCIgLz5cclxuLy8gLy8vIDxyZWZlcmVuY2UgcGF0aCA9IFwiLi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudHMudHNcIiAvPlxyXG4vLyAvLy8gPHJlZmVyZW5jZSBwYXRoID0gXCIuLi9zdGF0ZS9wcm9qZWN0LnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIFZhbGlkYXRpb24gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kLWRlY29yYXRvclwiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBwcm9qU3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdFwiO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcInByb2plY3QtaW5wdXRcIiwgXCJhcHBcIiwgdHJ1ZSwgXCJ1c2VyLWlucHV0XCIpO1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiN0aXRsZVwiXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI2Rlc2NyaXB0aW9uXCJcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI3Blb3BsZVwiXHJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIC8vIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge31cclxuXHJcbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHwgdm9pZCB7XHJcbiAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3QgZW50ZXJlZERlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZVZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluTGVuZ3RoOiA1LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICB2YWx1ZTogK2VudGVyZWRQZW9wbGUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IDEsXHJcbiAgICAgIG1heDogNSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAvLyBlbnRlcmVkVGl0bGUudHJpbSgpLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAvLyBlbnRlcmVkZERlc2NyaXB0aW9uLnRyaW0oKS5sZW5ndGggPT09IDAgfHxcclxuICAgICAgLy8gZW50ZXJlZFBlb3BsZS50cmltKCkubGVuZ3RoID09PSAwXHJcbiAgICAgICFWYWxpZGF0aW9uLnZhbGlkYXRlcyh0aXRsZVZhbGlkYXRhYmxlKSB8fFxyXG4gICAgICAhVmFsaWRhdGlvbi52YWxpZGF0ZXMoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHxcclxuICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGVzKHBlb3BsZVZhbGlkYXRhYmxlKVxyXG4gICAgKSB7XHJcbiAgICAgIGFsZXJ0KFwiRW50ZXIgdmFsaWQgdmFsdWUsIHRyeSBhZ2FpblwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFtlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjcmlwdGlvbiwgK2VudGVyZWRQZW9wbGVdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhcnNJbnB1dCgpIHtcclxuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICBAYXV0b2JpbmRcclxuICBwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgdXNlcklucHV0ID0gdGhpcy5nYXRoZXJVc2VySW5wdXQoKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcclxuICAgICAgY29uc3QgW3RpdCwgZGVzLCBwZXBdID0gdXNlcklucHV0O1xyXG4gICAgICBwcm9qU3RhdGUuYWRkUHJvamVjdCh0aXQsIGRlcywgcGVwKTtcclxuICAgICAgdGhpcy5jbGVhcnNJbnB1dCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4vLyB9XHJcbiIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4uL21vZGVscy9kcmFnLWRyb3AtaW50ZXJmYWNlcy50c1wiIC8+XHJcbi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4uL21vZGVscy9wcm9qZWN0LnRzXCIgLz5cclxuLy8gLy8vIDxyZWZlcmVuY2UgcGF0aCA9IFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3IudHNcIiAvPlxyXG4vLyAvLy8gPHJlZmVyZW5jZSBwYXRoID0gXCIuLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50cy50c1wiIC8+XHJcblxyXG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcC1pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3JcIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudHNcIjtcclxuXHJcbi8vIG5hbWVzcGFjZSBBcHAge1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlXHJcbntcclxuICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICBzdXBlcihcInNpbmdsZS1wcm9qZWN0XCIsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xyXG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIGdldCBwZXJzb25zKCkge1xyXG4gICAgaWYgKHRoaXMucHJvamVjdC5wZW9wbGUgPT09IDEpIHtcclxuICAgICAgcmV0dXJuIFwiMSBwZXJzb25cIjtcclxuICAgIH1cclxuICAgIHJldHVybiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zIGA7XHJcbiAgfVxyXG5cclxuICBAYXV0b2JpbmRcclxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiO1xyXG4gIH1cclxuICBAYXV0b2JpbmRcclxuICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpIHt9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgdGhpcy5kcmFnRW5kSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgzXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucyArIFwiIGFzc2lnbmVkXCI7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInBcIikhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG4vLyB9XHJcbiIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4uL21vZGVscy9kcmFnLWRyb3AtaW50ZXJmYWNlcy50c1wiIC8+XHJcbi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4uL21vZGVscy9wcm9qZWN0LnRzXCIgLz5cclxuLy8gLy8vIDxyZWZlcmVuY2UgcGF0aCA9IFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZC1kZWNvcmF0b3IudHNcIiAvPlxyXG4vLyAvLy8gPHJlZmVyZW5jZSBwYXRoID0gXCIuLi9zdGF0ZS9wcm9qZWN0LnRzXCIgLz5cclxuLy8gLy8vIDxyZWZlcmVuY2UgcGF0aCA9IFwiLi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudHMudHNcIiAvPlxyXG5cclxuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wLWludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kLWRlY29yYXRvclwiO1xyXG5pbXBvcnQgeyBwcm9qU3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdFwiO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3Byb2plY3QtaXRlbVwiO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdFxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdUYXJnZXRcclxue1xyXG4gIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBcImFjdGl2ZVwiIHwgXCJmaW5pc2hlZFwiKSB7XHJcbiAgICBzdXBlcihcInByb2plY3QtbGlzdFwiLCBcImFwcFwiLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcclxuXHJcbiAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuaWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzYDtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAYXV0b2JpbmRcclxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSBcInRleHQvcGxhaW5cIikge1xyXG4gICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpITtcclxuICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoXCJkcm9wcGFibGVcIik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBhdXRvYmluZFxyXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnN0IHBySWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xyXG5cclxuICAgIHByb2pTdGF0ZS5tb3ZlUHJvamVjdChcclxuICAgICAgcHJJZCxcclxuICAgICAgdGhpcy50eXBlID09PSBcImFjdGl2ZVwiID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXHJcbiAgICApO1xyXG4gIH1cclxuICBAYXV0b2JpbmRcclxuICBkcmFnTGVhdmVIYW5kbGVyKF86IERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XHJcbiAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZShcImRyb3BwYWJsZVwiKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCB0aGlzLmRyb3BIYW5kbGVyKTtcclxuXHJcbiAgICBwcm9qU3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJvaikgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFwiYWN0aXZlXCIpIHtcclxuICAgICAgICAgIHJldHVybiBwcm9qLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9qLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHJlbGV2YW50UHJvamVjdHM7XHJcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCA9IGxpc3RJZDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyBcIiBQUk9KRUNUU1wiO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgXHJcbiAgICApISBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcbiAgICAgIC8vIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAvLyBsaXN0SXRlbS50ZXh0Q29udGVudCA9IHByakl0ZW0udGl0bGU7XHJcbiAgICAgIC8vIGxpc3RFbC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcbiAgICAgIG5ldyBQcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCwgcHJqSXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbi8vIH1cclxuIiwiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbi8vIGRlY29yYXRvclxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQoXHJcbiAgXzogYW55LFxyXG4gIF8yOiBzdHJpbmcgfCBTeW1ib2wsXHJcbiAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXHJcbikge1xyXG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcclxuICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgIGdldCgpIHtcclxuICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XHJcbiAgICAgIHJldHVybiBib3VuZEZuO1xyXG4gICAgfSxcclxuICB9O1xyXG4gIHJldHVybiBhZGpEZXNjcmlwdG9yO1xyXG59XHJcbi8vIH1cclxuIiwiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbi8vIFByb2plY3QgVHlwZVxyXG5leHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICBBY3RpdmUsXHJcbiAgRmluaXNoZWQsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICApIHt9XHJcbn1cclxuLy8gfVxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XHJcblxyXG4vLyBuYW1lc3BhY2UgQXBwIHtcclxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xyXG5cclxuYWJzdHJhY3QgY2xhc3MgU3RhdGU8VD4ge1xyXG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcclxuXHJcbiAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xyXG4gIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGU7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhY2UoKSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzcmlwdGlvbjogc3RyaW5nLCBudW1PZlBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc3JpcHRpb24sXHJcbiAgICAgIG51bU9mUGVvcGxlLFxyXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcmopID0+IHByai5pZCA9PT0gcHJvamVjdElkKTtcclxuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcclxuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBzaW5nbGV0b25cclxuZXhwb3J0IGNvbnN0IHByb2pTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YWNlKCk7XHJcbi8vIH1cclxuIiwiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbi8vIHZhbGlkYXRpb25cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1heExlbmd0aD86IG51bWJlcjtcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVzKHZhbGlkYXRlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XHJcbiAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gIGlmICh2YWxpZGF0ZUlucHV0LnJlcXVpcmVkKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0ZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGVJbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcclxuICApIHtcclxuICAgIGlzVmFsaWQgPVxyXG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRlSW5wdXQudmFsdWUudHJpbSgpLmxlbmd0aCA+PSB2YWxpZGF0ZUlucHV0Lm1pbkxlbmd0aDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcclxuICApIHtcclxuICAgIGlzVmFsaWQgPVxyXG4gICAgICBpc1ZhbGlkICYmIHZhbGlkYXRlSW5wdXQudmFsdWUudHJpbSgpLmxlbmd0aCA8PSB2YWxpZGF0ZUlucHV0Lm1heExlbmd0aDtcclxuICB9XHJcbiAgaWYgKHZhbGlkYXRlSW5wdXQubWluICE9IG51bGwgJiYgdHlwZW9mIHZhbGlkYXRlSW5wdXQudmFsdWUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGVJbnB1dC5taW47XHJcbiAgfVxyXG4gIGlmICh2YWxpZGF0ZUlucHV0Lm1heCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0ZUlucHV0LnZhbHVlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0ZUlucHV0LnZhbHVlIDw9IHZhbGlkYXRlSW5wdXQubWF4O1xyXG4gIH1cclxuICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG4vLyB9XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gLy8vIDxyZWZlcmVuY2UgcGF0aCA9IFwiLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50c1wiIC8+XHJcbi8vIC8vLyA8cmVmZXJlbmNlIHBhdGggPSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzXCIgLz5cclxuXHJcbi8vIGltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QuanNcIjtcclxuLy8gaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LmpzXCI7XHJcblxyXG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0XCI7XHJcbmltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dFwiO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbm5ldyBQcm9qZWN0SW5wdXQoKTtcclxubmV3IFByb2plY3RMaXN0KFwiYWN0aXZlXCIpO1xyXG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcclxuLy8gfVxyXG5cclxuY29uc29sZS5sb2coXCJsbGxcIik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==