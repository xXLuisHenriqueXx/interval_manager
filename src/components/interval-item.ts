import { Autobind } from "../decorators/autobind";
import { IInterval } from "../models/interval";
import { Component } from "./base";

export class IntervalItem extends Component<HTMLUListElement, HTMLLIElement> {
  private interval: IInterval;

  constructor(hostId: string, interval: IInterval) {
    super("single-interval-template", hostId, false);

    this.interval = interval;

    this.configure();
    this.renderContent();
  }

  configure() {
    const button = this.element.querySelector("button")!;
    button.addEventListener("click", this.handleRemove.bind(this));
  }

  renderContent() {
    this.element.querySelector(
      ".interval"
    )!.textContent = `[${this.interval.start} - ${this.interval.end}]`;
  }

  @Autobind
  private handleRemove() {
    const event = new CustomEvent("interval-remove", {
      detail: this.interval.id,
      bubbles: true,
    });
    this.element.dispatchEvent(event);
  }
}
