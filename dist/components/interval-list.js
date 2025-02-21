"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalList = void 0;
const base_1 = require("./base");
const interval_item_1 = require("./interval-item");
class IntervalList extends base_1.Component {
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
            new interval_item_1.IntervalItem(listEl.id, intervalData);
        }
    }
}
exports.IntervalList = IntervalList;
//# sourceMappingURL=interval-list.js.map