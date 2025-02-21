import { Autobind } from "../decorators/autobind";
import { IValidatable, validate } from "../utils/validation";
import { Component } from "./base";
import { IntervalList } from "./interval-list";

export class IntervalInput extends Component<HTMLDivElement, HTMLFormElement> {
  startInput: HTMLInputElement;
  endInput: HTMLInputElement;
  private intervalList: IntervalList;

  private lastEndNumber: number = 0;

  constructor() {
    super("form-template", "app", true, "user-input");

    this.startInput = this.element.querySelector("#init") as HTMLInputElement;
    this.endInput = this.element.querySelector("#end") as HTMLInputElement;

    this.intervalList = new IntervalList();
    this.intervalList.setOnIntervalRemove(this.handleIntervalRemove.bind(this));
    this.configure();
  }

  private gatherInputs(): [number, number] | void {
    const enteredStart = this.startInput.value;
    const enteredEnd = this.endInput.value;

    const startValidatable: IValidatable = {
      value: enteredStart,
      required: true,
      lastEndNumber: this.lastEndNumber,
    };

    const endValidatable: IValidatable = {
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

  @Autobind
  private submitHandler(event: Event) {
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

  @Autobind
  private handleIntervalRemove(lastEndNumber: number) {
    this.lastEndNumber = lastEndNumber;
  }

  private clearInputs() {
    this.startInput.value = "";
    this.endInput.value = "";
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}
}
