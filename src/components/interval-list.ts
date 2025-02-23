import { IInterval } from "../models/interval";
import { Component } from "./base";
import { IntervalItem } from "./interval-item";

export class IntervalList extends Component<HTMLDivElement, HTMLElement> {
  private intervals: IInterval[] = [];
  private onIntervalRemove?: (lastEndNumber: number) => void;

  constructor() {
    super("intervals-template", "app", false, "intervals");

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("interval-remove", ((e: CustomEvent) => {
      this.removeInterval(e.detail);
    }) as EventListener);

    this.element.addEventListener("interval-edit", ((e: CustomEvent) => {
      this.editInterval(e.detail.id, e.detail.newEnd);
    }) as EventListener);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = "Intervalos cadastrados:";
  }

  addInterval(start: number, end: number) {
    const newInterval: IInterval = {
      id: Math.floor(Math.random() * 1000).toString(),
      start,
      end,
    };

    this.intervals.push(newInterval);
    this.renderList();
  }

  setOnIntervalRemove(handler: (lastEndNumber: number) => void) {
    this.onIntervalRemove = handler;
  }

  private editInterval(intervalId: string, newEnd: number) {
    const interval = this.intervals.find((int) => int.id === intervalId);

    if (interval) {
      interval.end = newEnd;
      this.renderList();

      if (this.onIntervalRemove) {
        this.onIntervalRemove(newEnd);
      }
    }
  }

  private removeInterval(intervalId: string) {
    const intervalIndex = this.intervals.findIndex(
      (int) => int.id === intervalId
    );

    if (intervalIndex !== -1) {
      this.intervals.splice(intervalIndex, this.intervals.length - intervalIndex);
      const lastEndNumber =
        intervalIndex > 0 ? this.intervals[intervalIndex - 1].end : 0;

      this.renderList();

      if (this.onIntervalRemove) {
        this.onIntervalRemove(lastEndNumber);
      }
    }
  }

  private renderList() {
    const listEl = this.element.querySelector("ul")!;
    listEl.innerHTML = "";

    this.intervals.forEach((intervalData, index) => {
      const lastInterval = index === this.intervals.length - 1;
      new IntervalItem(listEl.id, intervalData, lastInterval);
    });
  }
}
