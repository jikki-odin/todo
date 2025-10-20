import { format } from "date-fns";

import closeCircle from "../public/icons/close-circle.svg";

export class TodoDetailView {
  constructor(appContainer, todoController, projectController) {
    this.parentContainer = appContainer;
    this.container = document.createElement("div");
    this.container.classList.add("todo-details");

    this.todoController = todoController;
    this.projectController = projectController;
  }

  render() {
    const selectedTodo = this.todoController.selectedTodo;
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    const header = document.createElement("div");
    header.classList.add("todo-details-header");
    this.container.appendChild(header);

    const headerText = document.createElement("h2");
    header.appendChild(headerText);
    headerText.textContent = "Edit Tadoo";

    const closeButton = document.createElement("img");
    closeButton.classList.add("logo");
    header.appendChild(closeButton);
    closeButton.src = closeCircle;
    closeButton.addEventListener("click", () => {
      this.container.replaceChildren();
      this.parentContainer.removeChild(this.container);
    });

    const todoDetailsForm = document.createElement("form");
    this.container.appendChild(todoDetailsForm);
    todoDetailsForm.setAttribute("method", "post");

    // TODO: reformat in separate header

    const idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = "id";
    idInput.value = selectedTodo.id;
    todoDetailsForm.appendChild(idInput);

    const titleElement = document.createElement("div");
    titleElement.classList.add("form-element");
    todoDetailsForm.appendChild(titleElement);

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleElement.appendChild(titleLabel);
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleElement.appendChild(titleInput);
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.value = selectedTodo.title;
    titleInput.required = true;
    titleInput.type = "text";

    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("form-element");
    todoDetailsForm.appendChild(descriptionElement);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionElement.appendChild(descriptionLabel);
    descriptionLabel.textContent = "Description";

    const descriptionInput = document.createElement("input");
    descriptionElement.appendChild(descriptionInput);
    descriptionInput.id = "description";
    descriptionInput.name = "description";
    descriptionInput.value = selectedTodo.description;
    descriptionInput.required = true;
    descriptionInput.type = "text";

    // TODO: add project dropdown
    const projectElement = document.createElement("div");
    projectElement.classList.add("form-element");
    todoDetailsForm.appendChild(projectElement);

    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", "projectId");
    projectElement.appendChild(projectLabel);
    projectLabel.textContent = "Project";

    const projectSelector = document.createElement("select");
    projectElement.appendChild(projectSelector);
    projectSelector.name = "projectId";

    for (const [id, project] of this.projectController.projects) {
      const option = document.createElement("option");
      projectSelector.appendChild(option);
      option.value = id;
      option.textContent = project.title;

      if (id === this.projectController.selectedProject.id) {
        option.selected = true;
      }
    }

    const dueDateElement = document.createElement("div");
    dueDateElement.classList.add("form-element");
    todoDetailsForm.appendChild(dueDateElement);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateElement.appendChild(dueDateLabel);
    dueDateLabel.textContent = "Due Date";

    const dueDatePicker = document.createElement("input");
    dueDateElement.appendChild(dueDatePicker);
    dueDatePicker.name = "dueDate";
    dueDatePicker.value = format(selectedTodo.dueDate, "yyyy-MM-dd");
    dueDatePicker.required = true;
    dueDatePicker.type = "date";

    const priorityElement = document.createElement("div");
    priorityElement.classList.add("form-element");
    todoDetailsForm.appendChild(priorityElement);

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority");
    priorityElement.appendChild(priorityLabel);
    priorityLabel.textContent = "Priority";

    const prioritySelector = document.createElement("select");
    priorityElement.appendChild(prioritySelector);
    prioritySelector.name = "priority";

    for (const priorityValue of ["Low", "High", "Critical"]) {
      const option = document.createElement("option");
      prioritySelector.appendChild(option);
      option.value = priorityValue;
      option.textContent = priorityValue;

      if (option.value == selectedTodo.priority) {
        option.selected = true;
      }
    }

    const buttonElement = document.createElement("div");
    buttonElement.classList.add("form-buttons");
    todoDetailsForm.appendChild(buttonElement);

    const cancelButton = document.createElement("button");
    buttonElement.appendChild(cancelButton);
    cancelButton.type = "reset";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
      this.container.replaceChildren();
      this.parentContainer.removeChild(this.container);
    });

    const saveButton = document.createElement("button");
    buttonElement.appendChild(saveButton);
    saveButton.type = "submit";
    saveButton.formMethod = "dialog";
    saveButton.textContent = "Save";

    todoDetailsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(todoDetailsForm);
      const todoData = Object.fromEntries(formData.entries());
      todoData.id = parseInt(todoData.id);
      todoData.projectId = parseInt(todoData.projectId);

      const createdEvent = new CustomEvent("todoUpdated", {
        detail: {
          ...todoData,
        },
      });
      document.dispatchEvent(createdEvent);
      this.container.replaceChildren();
      this.parentContainer.removeChild(this.container);
    });
  }
}
