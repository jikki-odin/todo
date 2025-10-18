import { formatRelative } from "date-fns";

import kebabMenu from "../public/icons/kebab-menu.svg";

export class TodoListView {
  constructor(projectContainer, projectController, todoController) {
    this.parentContainer = projectContainer;
    this.container = document.createElement("div");
    // TODO: consolidate/hoist controller logic via event arch?
    this.projectController = projectController;
    this.todoController = todoController;
  }

  render() {
    this.parentContainer.appendChild(this.container);
    this.container.replaceChildren();

    // is a header necessary here?
    const header = document.createElement("div");
    this.container.appendChild(header);

    const headerText = document.createElement("h3");
    header.appendChild(headerText);
    headerText.textContent = "Todos";

    const todoList = document.createElement("ul");
    todoList.classList.add("project-todos");
    this.container.appendChild(todoList);

    for (const todo of this.projectController.selectedProject.todos) {
      const todoListItem = document.createElement("li");
      todoList.appendChild(todoListItem);
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-summary-item");
      todoListItem.appendChild(todoCard);
      todoCard.dataset.id = todo.id;

      const todoComplete = document.createElement("input");
      todoCard.appendChild(todoComplete);
      todoComplete.type = "checkbox";

      todoComplete.addEventListener("click", () => {
        this.todoController.toggleCompletion(todo.id);
      });

      const todoTitle = document.createElement("h3");
      todoCard.appendChild(todoTitle);
      todoTitle.textContent = todo.title;

      const todoDueDate = document.createElement("div");
      todoCard.appendChild(todoDueDate);
      todoDueDate.textContent = formatRelative(todo.dueDate, new Date());

      const todoOptionsButton = document.createElement("img");
      todoOptionsButton.classList.add("todo-details-button");
      todoOptionsButton.src = kebabMenu;

      // TODO: add handler for kebab menu expansion
      todoOptionsButton.addEventListener("click", () => {
        console.log(`Clicked options for todo ${todo.id} (${todo.title})...`);
      });

      todoCard.appendChild(todoOptionsButton);
    }

    const newTodoListItem = document.createElement("li");
    todoList.appendChild(newTodoListItem);
    const newTodoButton = document.createElement("button");
    newTodoListItem.appendChild(newTodoButton);
    newTodoButton.textContent = "+ Add a new task";
    newTodoButton.addEventListener("click", () => {
      console.log("Blue-ski-doo, creating new todo...");
      // TODO: add logic for a custom event to render the new project modal
      const event = new CustomEvent("newTodoRequested");
      document.dispatchEvent(event);
    });
  }

  displaySummary() {
    const todoTitle = document.createElement("h3");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = this.todo.title;
    todoCard.appendChild(todoTitle);

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-due-date");
    todoDueDate.textContent = formatRelative(this.todo.dueDate, new Date());
    todoCard.appendChild(todoDueDate);

    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.classList.add("todo-delete");
    todoDeleteButton.textContent = "x";
    // TODO: add handler for deletion
    todoCard.appendChild(todoDeleteButton);

    return todoCard;
  }
}
