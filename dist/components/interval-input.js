"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalInput = void 0;
const autobind_1 = require("../decorators/autobind");
const validation_1 = require("../utils/validation");
const base_1 = require("./base");
const interval_list_1 = require("./interval-list");
class IntervalInput extends base_1.Component {
    constructor() {
        super("form-template", "app", true, "user-input");
        this.lastEndNumber = 0;
        this.startInput = this.element.querySelector("#init");
        this.endInput = this.element.querySelector("#end");
        this.intervalList = new interval_list_1.IntervalList();
        this.configure();
    }
    gatherInputs() {
        const enteredStart = this.startInput.value;
        const enteredEnd = this.endInput.value;
        const startValidatable = {
            value: enteredStart,
            required: true,
            lastEndNumber: this.lastEndNumber,
        };
        const endValidatable = {
            value: enteredEnd,
            required: true,
        };
        if (!(0, validation_1.validate)(startValidatable) || !(0, validation_1.validate)(endValidatable)) {
            alert(`O intervalo deve começar em ${this.lastEndNumber}!`);
            return;
        }
        if (+enteredEnd <= +enteredStart) {
            alert("O fim do intervalo deve ser maior que o início");
            return;
        }
        return [+enteredStart, +enteredEnd];
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherInputs();
        if (Array.isArray(userInput)) {
            const [start, end] = userInput;
            this.intervalList.addInterval(start, end);
            this.lastEndNumber = end;
            this.clearInputs();
            this.startInput.focus();
        }
    }
    clearInputs() {
        this.startInput.value = "";
        this.endInput.value = "";
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    renderContent() { }
}
exports.IntervalInput = IntervalInput;
__decorate([
    autobind_1.Autobind
], IntervalInput.prototype, "submitHandler", null);
//# sourceMappingURL=interval-input.js.map