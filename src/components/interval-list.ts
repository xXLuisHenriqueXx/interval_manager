import { IInterval } from "../models/interval";
import { Component } from "./base";
import { IntervalItem } from "./interval-item";

export class IntervalList extends Component<HTMLDivElement, HTMLElement> {
  private intervals: IInterval[] = [];

  constructor() {
    super("intervals-template", "app", false, "intervals");

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("interval-remove", ((e: CustomEvent) => {
      this.removeInterval(e.detail);
    }) as EventListener);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = "Intervalos cadastrados:";
  }

  addInterval(start: number, end: number) {
    const newInterval: IInterval = {
      id: Math.random().toString(),
      start,
      end,
    };

    this.intervals.push(newInterval);
    this.renderList();
  }

  private removeInterval(intervalId: string) {
    this.intervals = this.intervals.filter((int) => int.id !== intervalId);
    this.renderList();
  }

  private renderList() {
    const listEl = this.element.querySelector("ul")!;
    listEl.innerHTML = "";

    for (const intervalData of this.intervals) {
      new IntervalItem(listEl.id, intervalData);
    }
  }
}
