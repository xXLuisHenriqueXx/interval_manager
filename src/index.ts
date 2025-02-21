interface IValidatable {
  required: boolean;
  value: string | number;
  lastEndNumber?: number;
}

const validate = (input: IValidatable) => {
  let isValid = true;

  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }

  if (input.lastEndNumber !== undefined) {
    if (input.lastEndNumber === 0) {
      isValid = isValid && +input.value === 0;
    } else {
      isValid = isValid && +input.value === input.lastEndNumber;
    }
  }

  return isValid;
};

// Autobind decorator
// _ = target
// __ = method name
const Autobind = (_: any, __: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
};

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

interface IInterval {
  start: number;
  end: number;
  id: string;
}

class IntervalItem extends Component<HTMLUListElement, HTMLLIElement> {
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

class IntervalList extends Component<HTMLDivElement, HTMLElement> {
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

class IntervalInput extends Component<HTMLDivElement, HTMLFormElement> {
  startInput: HTMLInputElement;
  endInput: HTMLInputElement;
  private intervalList: IntervalList;

  private lastEndNumber: number = 0;

  constructor() {
    super("form-template", "app", true, "user-input");

    this.startInput = this.element.querySelector("#init") as HTMLInputElement;
    this.endInput = this.element.querySelector("#end") as HTMLInputElement;

    this.intervalList = new IntervalList();
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

  private clearInputs() {
    this.startInput.value = "";
    this.endInput.value = "";
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}
}

const intervalInput = new IntervalInput();