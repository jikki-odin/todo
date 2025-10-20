import closeCircle from "../../public/icons/close-circle.svg";

export class NewTodoView {
  constructor(appContainer, projectController) {
    this.parentContainer = appContainer;
    this.container = document.createElement("dialog");
    this.container.classList.add("modal");
    this.projectController = projectController;
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();
    const header = document.createElement("div");
    header.classList.add("modal-header");
    this.container.appendChild(header);

    const headerText = document.createElement("h2");
    header.appendChild(headerText);
    headerText.textContent = "New Todo";

    const closeButton = document.createElement("img");
    closeButton.classList.add("logo");
    header.appendChild(closeButton);
    closeButton.src = closeCircle;
    closeButton.addEventListener("click", () => {
      newTodoForm.reset();
      this.container.close();
    });

    const newTodoForm = document.createElement("form");
    this.container.appendChild(newTodoForm);
    newTodoForm.setAttribute("method", "post");

    const titleElement = document.createElement("div");
    titleElement.classList.add("form-element");
    newTodoForm.appendChild(titleElement);

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleElement.appendChild(titleLabel);
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleElement.appendChild(titleInput);
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.placeholder = "Whatcha wanna tadoo?";
    titleInput.required = true;
    titleInput.type = "text";

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("form-element");
    newTodoForm.appendChild(descriptionElement);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionElement.appendChild(descriptionLabel);
    descriptionLabel.textContent = "Description";

    const descriptionInput = document.createElement("input");
    descriptionElement.appendChild(descriptionInput);
    descriptionInput.id = "description";
    descriptionInput.name = "description";
    descriptionInput.placeholder = "An engaging, succinct description...";
    descriptionInput.required = true;
    descriptionInput.type = "text";

    // add dueDate picker
    const dueDateElement = document.createElement("div");
    dueDateElement.classList.add("form-element");
    newTodoForm.appendChild(dueDateElement);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateElement.appendChild(dueDateLabel);
    dueDateLabel.textContent = "Due Date";

    const dueDatePicker = document.createElement("input");
    dueDateElement.appendChild(dueDatePicker);
    dueDatePicker.id = "dueDate";
    dueDatePicker.name = "dueDate";
    dueDatePicker.required = true;
    dueDatePicker.type = "date";

    const priorityElement = document.createElement("div");
    priorityElement.classList.add("form-element");
    newTodoForm.appendChild(priorityElement);

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority");
    priorityElement.appendChild(priorityLabel);
    priorityLabel.textContent = "Priority";

    const prioritySelector = document.createElement("select");
    priorityElement.appendChild(prioritySelector);
    prioritySelector.id = "priority";
    prioritySelector.name = "priority";

    for (const priorityValue of ["Low", "High", "Critical"]) {
      const option = document.createElement("option");
      prioritySelector.appendChild(option);
      option.value = priorityValue;
      option.textContent = priorityValue;
    }

    const buttonElement = document.createElement("div");
    buttonElement.classList.add("form-buttons");
    newTodoForm.appendChild(buttonElement);

    const cancelButton = document.createElement("button");
    buttonElement.appendChild(cancelButton);
    cancelButton.type = "reset";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
      newTodoForm.reset();
      this.container.close();
    });

    const submitButton = document.createElement("button");
    buttonElement.appendChild(submitButton);
    submitButton.type = "submit";
    submitButton.formMethod = "dialog";
    submitButton.textContent = "Create";

    newTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(newTodoForm);
      const todoData = Object.fromEntries(formData.entries());

      const createdEvent = new CustomEvent("todoCreated", {
        detail: {
          ...todoData,
          projectId: this.projectController.selectedProject.id,
        },
      });
      document.dispatchEvent(createdEvent);

      newTodoForm.reset();
      this.container.close();
    });

    this.container.showModal();
  }
}
