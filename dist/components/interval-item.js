"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalItem = void 0;
const autobind_1 = require("../decorators/autobind");
const base_1 = require("./base");
class IntervalItem extends base_1.Component {
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
exports.IntervalItem = IntervalItem;
__decorate([
    autobind_1.Autobind
], IntervalItem.prototype, "handleRemove", null);
//# sourceMappingURL=interval-item.js.map