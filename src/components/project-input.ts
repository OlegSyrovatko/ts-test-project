// /// <reference path = "../util/validation.ts" />
// /// <reference path = "../decorators/autobind-decorator.ts" />
// /// <reference path = "../components/base-components.ts" />
// /// <reference path = "../state/project.ts" />

import * as Validation from "../util/validation";
import { autobind } from "../decorators/autobind-decorator";
import Component from "../components/base-components";
import { projState } from "../state/project";

// namespace App {
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    // this.element.addEventListener("submit", this.submitHandler.bind(this));
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      // enteredTitle.trim().length === 0 ||
      // entereddDescription.trim().length === 0 ||
      // enteredPeople.trim().length === 0
      !Validation.validates(titleValidatable) ||
      !Validation.validates(descriptionValidatable) ||
      !Validation.validates(peopleValidatable)
    ) {
      alert("Enter valid value, try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearsInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [tit, des, pep] = userInput;
      projState.addProject(tit, des, pep);
      this.clearsInput();
    }
  }
}
// }
