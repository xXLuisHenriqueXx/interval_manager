/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base.ts":
/*!********************************!*\
  !*** ./src/components/base.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Component = void 0;\nclass Component {\n    constructor(templateId, hostElementId, insertAtStart, newElementId) {\n        this.templateElement = document.getElementById(templateId);\n        this.hostElement = document.getElementById(hostElementId);\n        const importedNode = document.importNode(this.templateElement.content, true);\n        this.element = importedNode.firstElementChild;\n        if (newElementId) {\n            this.element.id = newElementId;\n        }\n        this.attach(insertAtStart);\n    }\n    attach(insertAtBeginning) {\n        this.hostElement.insertAdjacentElement(insertAtBeginning ? \"afterbegin\" : \"beforeend\", this.element);\n    }\n}\nexports.Component = Component;\n\n\n//# sourceURL=webpack://interval-manager/./src/components/base.ts?");

/***/ }),

/***/ "./src/components/interval-input.ts":
/*!******************************************!*\
  !*** ./src/components/interval-input.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.IntervalInput = void 0;\nconst autobind_1 = __webpack_require__(/*! ../decorators/autobind */ \"./src/decorators/autobind.ts\");\nconst validation_1 = __webpack_require__(/*! ../utils/validation */ \"./src/utils/validation.ts\");\nconst base_1 = __webpack_require__(/*! ./base */ \"./src/components/base.ts\");\nconst interval_list_1 = __webpack_require__(/*! ./interval-list */ \"./src/components/interval-list.ts\");\nclass IntervalInput extends base_1.Component {\n    constructor() {\n        super(\"form-template\", \"app\", true, \"user-input\");\n        this.lastEndNumber = 0;\n        this.startInput = this.element.querySelector(\"#init\");\n        this.endInput = this.element.querySelector(\"#end\");\n        this.intervalList = new interval_list_1.IntervalList();\n        this.intervalList.setOnIntervalRemove(this.handleIntervalRemove.bind(this));\n        this.configure();\n    }\n    gatherInputs() {\n        const enteredStart = this.startInput.value;\n        const enteredEnd = this.endInput.value;\n        const startValidatable = {\n            value: enteredStart,\n            required: true,\n            lastEndNumber: this.lastEndNumber,\n        };\n        const endValidatable = {\n            value: enteredEnd,\n            required: true,\n        };\n        if (!(0, validation_1.validate)(startValidatable) || !(0, validation_1.validate)(endValidatable)) {\n            alert(`O intervalo deve começar em ${this.lastEndNumber}!`);\n            return;\n        }\n        if (+enteredEnd <= +enteredStart) {\n            alert(\"O fim do intervalo deve ser maior que o início\");\n            return;\n        }\n        return [+enteredStart, +enteredEnd];\n    }\n    submitHandler(event) {\n        event.preventDefault();\n        const userInput = this.gatherInputs();\n        if (Array.isArray(userInput)) {\n            const [start, end] = userInput;\n            this.intervalList.addInterval(start, end);\n            this.lastEndNumber = end;\n            this.clearInputs();\n            this.startInput.focus();\n        }\n    }\n    handleIntervalRemove(lastEndNumber) {\n        this.lastEndNumber = lastEndNumber;\n    }\n    clearInputs() {\n        this.startInput.value = \"\";\n        this.endInput.value = \"\";\n    }\n    configure() {\n        this.element.addEventListener(\"submit\", this.submitHandler.bind(this));\n    }\n    renderContent() { }\n}\nexports.IntervalInput = IntervalInput;\n__decorate([\n    autobind_1.Autobind\n], IntervalInput.prototype, \"submitHandler\", null);\n__decorate([\n    autobind_1.Autobind\n], IntervalInput.prototype, \"handleIntervalRemove\", null);\n\n\n//# sourceURL=webpack://interval-manager/./src/components/interval-input.ts?");

/***/ }),

/***/ "./src/components/interval-item.ts":
/*!*****************************************!*\
  !*** ./src/components/interval-item.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.IntervalItem = void 0;\nconst autobind_1 = __webpack_require__(/*! ../decorators/autobind */ \"./src/decorators/autobind.ts\");\nconst base_1 = __webpack_require__(/*! ./base */ \"./src/components/base.ts\");\nclass IntervalItem extends base_1.Component {\n    constructor(hostId, interval, isLastInterval) {\n        super(\"single-interval-template\", hostId, false);\n        this.interval = interval;\n        this.configure(isLastInterval);\n        this.renderContent();\n    }\n    configure(isLastInterval) {\n        const buttonRemove = this.element.querySelector(\"#remove\");\n        buttonRemove.addEventListener(\"click\", this.handleRemove.bind(this));\n        const buttonEdit = this.element.querySelector(\"#edit\");\n        if (!isLastInterval) {\n            buttonEdit.disabled = true;\n        }\n        else {\n            buttonEdit.addEventListener(\"click\", this.handleEdit.bind(this));\n        }\n    }\n    handleEdit() {\n        const newEnd = prompt(\"Digite o novo valor final:\");\n        if (newEnd && !isNaN(+newEnd) && +newEnd > this.interval.start) {\n            const event = new CustomEvent(\"interval-edit\", {\n                detail: {\n                    id: this.interval.id,\n                    newEnd: +newEnd,\n                },\n                bubbles: true,\n            });\n            this.element.dispatchEvent(event);\n        }\n        else {\n            alert(\"Valor inválido! O fim deve ser maior que o início.\");\n        }\n    }\n    renderContent() {\n        this.element.querySelector(\".interval\").textContent = `[${this.interval.start} - ${this.interval.end}]`;\n        const buttonEdit = this.element.querySelector(\"#edit\");\n        buttonEdit.innerHTML = `\r\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n        <g clip-path=\"url(#clip0_27_2)\">\r\n          <path d=\"M17.645 5.67664C18.0856 5.23616 18.3332 4.63869 18.3333 4.01568C18.3333 3.39267 18.0859 2.79515 17.6454 2.35456C17.205 1.91396 16.6075 1.6664 15.9845 1.66632C15.3615 1.66624 14.764 1.91366 14.3234 2.35414L3.20169 13.4783C3.00821 13.6712 2.86512 13.9087 2.78503 14.17L1.68419 17.7966C1.66266 17.8687 1.66103 17.9453 1.67949 18.0182C1.69794 18.0911 1.73579 18.1577 1.78902 18.2108C1.84225 18.264 1.90888 18.3017 1.98183 18.32C2.05477 18.3384 2.13133 18.3366 2.20336 18.315L5.83086 17.215C6.09183 17.1356 6.32934 16.9934 6.52253 16.8008L17.645 5.67664Z\" stroke=\"#1F1F22\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n        </g>\r\n        <defs>\r\n          <clipPath id=\"clip0_27_2\">\r\n          <rect width=\"20\" height=\"20\" fill=\"white\"/>\r\n          </clipPath>\r\n        </defs>\r\n      </svg>\r\n\r\n    `;\n        const buttonRemove = this.element.querySelector(\"#remove\");\n        buttonRemove.innerHTML = `\r\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n        <path d=\"M15 5L5 15\" stroke=\"#1f1f22\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n        <path d=\"M5 5L15 15\" stroke=\"#1f1f22\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\r\n      </svg>\r\n\r\n\r\n    `;\n    }\n    handleRemove() {\n        const event = new CustomEvent(\"interval-remove\", {\n            detail: this.interval.id,\n            bubbles: true,\n        });\n        this.element.dispatchEvent(event);\n    }\n}\nexports.IntervalItem = IntervalItem;\n__decorate([\n    autobind_1.Autobind\n], IntervalItem.prototype, \"handleEdit\", null);\n__decorate([\n    autobind_1.Autobind\n], IntervalItem.prototype, \"handleRemove\", null);\n\n\n//# sourceURL=webpack://interval-manager/./src/components/interval-item.ts?");

/***/ }),

/***/ "./src/components/interval-list.ts":
/*!*****************************************!*\
  !*** ./src/components/interval-list.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.IntervalList = void 0;\nconst base_1 = __webpack_require__(/*! ./base */ \"./src/components/base.ts\");\nconst interval_item_1 = __webpack_require__(/*! ./interval-item */ \"./src/components/interval-item.ts\");\nclass IntervalList extends base_1.Component {\n    constructor() {\n        super(\"intervals-template\", \"app\", false, \"intervals\");\n        this.intervals = [];\n        this.configure();\n        this.renderContent();\n    }\n    configure() {\n        this.element.addEventListener(\"interval-remove\", ((e) => {\n            this.removeInterval(e.detail);\n        }));\n        this.element.addEventListener(\"interval-edit\", ((e) => {\n            this.editInterval(e.detail.id, e.detail.newEnd);\n        }));\n    }\n    renderContent() {\n        this.element.querySelector(\"h2\").textContent = \"Intervalos cadastrados:\";\n    }\n    addInterval(start, end) {\n        const newInterval = {\n            id: Math.random().toString(),\n            start,\n            end,\n        };\n        this.intervals.push(newInterval);\n        this.renderList();\n    }\n    setOnIntervalRemove(handler) {\n        this.onIntervalRemove = handler;\n    }\n    editInterval(intervalId, newEnd) {\n        const interval = this.intervals.find(int => int.id === intervalId);\n        if (interval) {\n            interval.end = newEnd;\n            this.renderList();\n            if (this.onIntervalRemove) {\n                this.onIntervalRemove(newEnd);\n            }\n        }\n    }\n    removeInterval(intervalId) {\n        const intervalIndex = this.intervals.findIndex((int) => int.id === intervalId);\n        if (intervalIndex !== -1) {\n            this.intervals.splice(intervalIndex);\n            const lastEndNumber = intervalIndex > 0\n                ? this.intervals[intervalIndex - 1].end\n                : 0;\n            this.renderList();\n            if (this.onIntervalRemove) {\n                this.onIntervalRemove(lastEndNumber);\n            }\n        }\n    }\n    renderList() {\n        const listEl = this.element.querySelector(\"ul\");\n        listEl.innerHTML = \"\";\n        this.intervals.forEach((intervalData, index) => {\n            const lastInterval = index === this.intervals.length - 1;\n            new interval_item_1.IntervalItem(listEl.id, intervalData, lastInterval);\n        });\n    }\n}\nexports.IntervalList = IntervalList;\n\n\n//# sourceURL=webpack://interval-manager/./src/components/interval-list.ts?");

/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Autobind = void 0;\nconst Autobind = (_, __, descriptor) => {\n    const originalMethod = descriptor.value;\n    const adjDescriptor = {\n        configurable: true,\n        get() {\n            const boundFn = originalMethod.bind(this);\n            return boundFn;\n        },\n    };\n    return adjDescriptor;\n};\nexports.Autobind = Autobind;\n\n\n//# sourceURL=webpack://interval-manager/./src/decorators/autobind.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst interval_input_1 = __webpack_require__(/*! ./components/interval-input */ \"./src/components/interval-input.ts\");\nnew interval_input_1.IntervalInput();\n\n\n//# sourceURL=webpack://interval-manager/./src/index.ts?");

/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validate = void 0;\nconst validate = (input) => {\n    let isValid = true;\n    if (input.required) {\n        isValid = isValid && input.value.toString().trim().length !== 0;\n    }\n    if (input.lastEndNumber !== undefined) {\n        const currentValue = +input.value;\n        if (input.lastEndNumber === 0) {\n            isValid = isValid && currentValue === 0;\n        }\n        else {\n            isValid = isValid && currentValue === input.lastEndNumber;\n        }\n    }\n    return isValid;\n};\nexports.validate = validate;\n\n\n//# sourceURL=webpack://interval-manager/./src/utils/validation.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;