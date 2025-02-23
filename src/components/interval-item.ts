import { Autobind } from "../decorators/autobind";
import { IInterval } from "../models/interval";
import { Component } from "./base";

export class IntervalItem extends Component<HTMLUListElement, HTMLLIElement> {
  private interval: IInterval;

  constructor(hostId: string, interval: IInterval, isLastInterval: boolean) {
    super("single-interval-template", hostId, false);

    this.interval = interval;

    this.configure(isLastInterval);
    this.renderContent();
  }

  configure(isLastInterval?: boolean) {
    const buttonRemove = this.element.querySelector(
      "#remove"
    )! as HTMLButtonElement;
    buttonRemove.addEventListener("click", this.handleRemove.bind(this));

    const buttonEdit = this.element.querySelector(
      "#edit"
    )! as HTMLButtonElement;
    if (!isLastInterval) {
      buttonEdit.disabled = true;
    } else {
      buttonEdit.addEventListener("click", this.handleEdit.bind(this));
    }
  }

  renderContent() {
    this.element.querySelector(
      ".interval"
    )!.textContent = `[${this.interval.start} - ${this.interval.end}]`;

    const buttonEdit = this.element.querySelector("#edit")!;
    buttonEdit.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_27_2)">
          <path d="M17.645 5.67664C18.0856 5.23616 18.3332 4.63869 18.3333 4.01568C18.3333 3.39267 18.0859 2.79515 17.6454 2.35456C17.205 1.91396 16.6075 1.6664 15.9845 1.66632C15.3615 1.66624 14.764 1.91366 14.3234 2.35414L3.20169 13.4783C3.00821 13.6712 2.86512 13.9087 2.78503 14.17L1.68419 17.7966C1.66266 17.8687 1.66103 17.9453 1.67949 18.0182C1.69794 18.0911 1.73579 18.1577 1.78902 18.2108C1.84225 18.264 1.90888 18.3017 1.98183 18.32C2.05477 18.3384 2.13133 18.3366 2.20336 18.315L5.83086 17.215C6.09183 17.1356 6.32934 16.9934 6.52253 16.8008L17.645 5.67664Z" stroke="#1F1F22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_27_2">
          <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `;

    const buttonRemove = this.element.querySelector("#remove")!;
    buttonRemove.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L5 15" stroke="#1f1f22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 5L15 15" stroke="#1f1f22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  @Autobind
  private handleEdit() {
    const newEnd = prompt("Digite o novo valor final:");

    if (newEnd && +newEnd > this.interval.start) {
      const event = new CustomEvent("interval-edit", {
        detail: {
          id: this.interval.id,
          newEnd: +newEnd,
        },
        bubbles: true,
      });
      this.element.dispatchEvent(event);
    } else {
      alert("Valor inválido! O fim deve ser maior que o início.");
    }
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
