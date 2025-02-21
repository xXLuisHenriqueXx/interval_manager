"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const validate = (input) => {
    let isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0;
    }
    if (input.lastEndNumber !== undefined) {
        if (input.lastEndNumber === 0) {
            isValid = isValid && +input.value === 0;
        }
        else {
            isValid = isValid && +input.value === input.lastEndNumber;
        }
    }
    return isValid;
};
const Autobind = (_, __, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
class IntervalItem extends Component {
    constructor(hostId, interval) {
        super("single-interval-template", hostId, false);
        this.interval = interval;
        this.configure();
        this.renderContent();
    }
    configure() {
        const button = this.element.querySelector("button");
        button.addEventListener("click", this.handleRemove.bind(this));
    }
    renderContent() {
        this.element.querySelector(".interval").textContent = `[${this.interval.start} - ${this.interval.end}]`;
    }
    handleRemove() {
        const event = new CustomEvent("interval-remove", {
            detail: this.interval.id,
            bubbles: true,
        });
        this.element.dispatchEvent(event);
    }
}
__decorate([
    Autobind
], IntervalItem.prototype, "handleRemove", null);
class IntervalList extends Component {
    constructor() {
        super("intervals-template", "app", false, "intervals");
        this.intervals = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener("interval-remove", ((e) => {
            this.removeInterval(e.detail);
        }));
    }
    renderContent() {
        this.element.querySelector("h2").textContent = "Intervalos cadastrados:";
    }
    addInterval(start, end) {
        const newInterval = {
            id: Math.random().toString(),
            start,
            end,
        };
        this.intervals.push(newInterval);
        this.renderList();
    }
    removeInterval(intervalId) {
        this.intervals = this.intervals.filter((int) => int.id !== intervalId);
        this.renderList();
    }
    renderList() {
        const listEl = this.element.querySelector("ul");
        listEl.innerHTML = "";
        for (const intervalData of this.intervals) {
            new IntervalItem(listEl.id, intervalData);
        }
    }
}
class IntervalInput extends Component {
    constructor() {
        super("form-template", "app", true, "user-input");
        this.lastEndNumber = 0;
        this.startInput = this.element.querySelector("#init");
        this.endInput = this.element.querySelector("#end");
        this.intervalList = new IntervalList();
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
        if (!validate(startValidatable) || !validate(endValidatable)) {
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
__decorate([
    Autobind
], IntervalInput.prototype, "submitHandler", null);
const intervalInput = new IntervalInput();
//# sourceMappingURL=index.js.map